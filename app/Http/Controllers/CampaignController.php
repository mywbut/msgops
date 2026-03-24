<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignContact;
use App\Models\Contact;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * Display a listing of campaigns.
     */
    public function index(Request $request)
    {
        $campaigns = Campaign::where('org_id', $request->user()->org_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('WhatsApp/Campaigns/Index', [
            'campaigns' => $campaigns,
            'success' => session('success'),
            'error' => session('error'),
        ]);
    }

    /**
     * Show the form for creating a new campaign.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();
        
        $templates = [];
        if ($config && $config->waba_id && $config->access_token) {
            try {
                $response = Http::withToken($config->access_token)
                    ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates?limit=100");
                
                if ($response->successful()) {
                    $templates = collect($response->json()['data'] ?? [])
                        ->where('status', 'APPROVED')
                        ->values()
                        ->toArray();
                }
            } catch (\Exception $e) {
                Log::error('Wizard Template Fetch Error: ' . $e->getMessage());
            }
        }

        $contacts = Contact::where('org_id', $user->org_id)->get();
        // Get unique tags from contacts
        $tags = $contacts->pluck('tags')->flatten()->unique()->filter()->values()->toArray();

        return Inertia::render('WhatsApp/Campaigns/Create', [
            'templates' => $templates,
            'contacts' => $contacts,
            'tags' => $tags,
            'isConnected' => $config ? true : false,
        ]);
    }

    /**
     * Store a newly created campaign and initiate broadcast.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'template_name' => 'required|string',
            'language' => 'required|string',
            'audience_type' => 'required|in:ALL,TAGS,INDIVIDUAL',
            'selected_tags' => 'required_if:audience_type,TAGS|array',
            'selected_contacts' => 'required_if:audience_type,INDIVIDUAL|array',
        ]);

        $user = $request->user();
        
        // Resolve contacts based on audience selection
        $query = Contact::where('org_id', $user->org_id);
        
        if ($request->audience_type === 'TAGS') {
            $query->where(function($q) use ($request) {
                foreach ($request->selected_tags as $tag) {
                    $q->orWhereJsonContains('tags', $tag);
                }
            });
        } elseif ($request->audience_type === 'INDIVIDUAL') {
            $query->whereIn('id', $request->selected_contacts);
        }

        $targetContacts = $query->get();

        if ($targetContacts->isEmpty()) {
            return redirect()->back()->with('error', 'No contacts found for the selected audience.');
        }

        $campaign = Campaign::create([
            'org_id' => $user->org_id,
            'name' => $request->name,
            'template_name' => $request->template_name,
            'language' => $request->language,
            'status' => 'SENDING',
            'total_contacts' => $targetContacts->count(),
        ]);

        // Create campaign contacts
        foreach ($targetContacts as $contact) {
            CampaignContact::create([
                'campaign_id' => $campaign->id,
                'contact_id' => $contact->id,
                'status' => 'PENDING',
            ]);
        }

        // Dispatch SendCampaignJob for async processing
        \App\Jobs\SendCampaignJob::dispatch($campaign);
        
        return redirect()->route('whatsapp.campaigns.index')
            ->with('success', "Campaign '{$campaign->name}' created and broadcast initiated to {$campaign->total_contacts} contacts.");
    }
}
