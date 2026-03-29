<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\CampaignContact;
use App\Models\Contact;
use App\Models\Message;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Carbon\Carbon;

class CampaignController extends Controller
{
    /**
     * Display a listing of campaigns.
     */
    public function index(Request $request)
    {
        $startDate = $request->query('start_date', now()->subDays(30)->toDateString());
        $endDate = $request->query('end_date', now()->toDateString());
        $orgId = $request->user()->org_id;

        $query = Campaign::where('org_id', $orgId)
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<=', $endDate)
            ->orderBy('created_at', 'desc');

        $campaignsForStats = $query->get();
        
        // Calculate aggregated stats
        $stats = [
            'sent' => $campaignsForStats->sum('sent_count'),
            'delivered' => $campaignsForStats->sum('delivered_count'),
            'read' => $campaignsForStats->sum('read_count'),
            'replied' => $campaignsForStats->sum('replied_count'),
            'failed' => $campaignsForStats->sum('failed_count'),
            'sending' => $campaignsForStats->where('status', 'SENDING')->count(),
            'processing' => $campaignsForStats->where('status', 'PROCESSING')->count(),
            'queued' => $campaignsForStats->where('status', 'SCHEDULED')->count(),
        ];

        $perPage = $request->query('per_page', 5);
        $campaigns = $query->paginate($perPage)->withQueryString();

        // Fetch Real Meta Health Data
        $config = WhatsappConfig::where('org_id', $orgId)->first();
        $metaHealth = [
            'daily_limit' => 250, // Default for non-connected/new
            'unique_contacts' => 0,
            'consecutive_days' => [false, false, false, false, false, false, false],
            'quality_rating' => 'N/A',
        ];

        if ($config && $config->phone_number_id && $config->access_token) {
            $cacheKey = "meta_health_v2_{$config->phone_number_id}";
            $metaApiData = Cache::remember($cacheKey, now()->addHours(24), function () use ($config) {
                try {
                    $response = Http::withToken($config->access_token)
                        ->get("https://graph.facebook.com/v18.0/{$config->phone_number_id}?fields=messaging_limit_tier,quality_rating");

                    if ($response->successful()) {
                        return $response->json();
                    }
                    Log::error("Campaign Meta API Error: " . $response->body());
                } catch (\Exception $e) {
                    Log::error("Campaign Meta API Exception: " . $e->getMessage());
                }
                return null;
            });

            if ($metaApiData) {
                $tierMap = [
                    'TIER_250' => 250,
                    'TIER_2K' => 2000,
                    'TIER_10K' => 10000,
                    'TIER_100K' => 100000,
                    'TIER_UNLIMITED' => 'Unlimited',
                ];
                $metaHealth['daily_limit'] = $tierMap[$metaApiData['messaging_limit_tier'] ?? 'TIER_250'] ?? 250;
                $metaHealth['quality_rating'] = $metaApiData['quality_rating'] ?? 'Unknown';
            }

            // Calculate actual usage (Unique contacts in last 24 hours)
            $metaHealth['unique_contacts'] = \App\Models\Message::where('org_id', $orgId)
                ->where('direction', 'outbound')
                ->where('created_at', '>=', now()->subHours(24))
                ->distinct('contact_id')
                ->count();

            // Calculate consecutive days (last 7 days)
            $consecutiveDays = [];
            for ($i = 6; $i >= 0; $i--) {
                $day = Carbon::today()->subDays($i);
                $hasMessaged = \App\Models\Message::where('org_id', $orgId)
                    ->where('direction', 'outbound')
                    ->whereDate('created_at', $day)
                    ->exists();
                $consecutiveDays[] = $hasMessaged;
            }
            $metaHealth['consecutive_days'] = $consecutiveDays;
        }

        return Inertia::render('WhatsApp/Campaigns/Index', [
            'campaigns' => $campaigns,
            'stats' => $stats,
            'metaHealth' => $metaHealth,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
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

            // Fetch Messaging Limit from Meta Health
            try {
                $healthResponse = Http::withToken($config->access_token)
                    ->get("https://graph.facebook.com/v18.0/{$config->phone_number_id}?fields=messaging_limit_tier,account_mode");
                
                if ($healthResponse->successful()) {
                    $healthData = $healthResponse->json();
                    $tierMap = [
                        'TIER_250' => 250,
                        'TIER_2K' => 2000,
                        'TIER_10K' => 10000,
                        'TIER_100K' => 100000,
                        'TIER_UNLIMITED' => 1000000, // Large number for unlimited
                    ];
                    $dailyLimit = $tierMap[$healthData['messaging_limit_tier'] ?? 'TIER_250'] ?? 250;
                }
            } catch (\Exception $e) {
                Log::error('Wizard Health Fetch Error: ' . $e->getMessage());
            }
        }

        $dailyLimit = $dailyLimit ?? 250;
        $currentUsage = \App\Models\Message::where('org_id', $user->org_id)
            ->where('direction', 'outbound')
            ->where('created_at', '>=', now()->subHours(24))
            ->distinct('contact_id')
            ->count();

        $contacts = Contact::where('org_id', $user->org_id)->get();
        // Get unique tags from contacts
        $tags = $contacts->pluck('tags')->flatten()->unique()->filter()->values()->toArray();

        return Inertia::render('WhatsApp/Campaigns/Create', [
            'templates' => $templates,
            'contacts' => $contacts,
            'tags' => $tags,
            'prefill' => [
                'template_name' => $request->query('template_name'),
                'language' => $request->query('language'),
            ],
            'isConnected' => (bool)$config,
            'accountName' => $config?->account_name,
            'dailyLimit' => $dailyLimit,
            'currentUsage' => $currentUsage,
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
            'variables_mapping' => 'nullable|array',
        ]);

        $user = $request->user();
        
        // Resolve contacts based on audience selection
        $query = Contact::where('org_id', $user->org_id);
        
        // Priority: if selected_contacts is passed (even in ALL mode), handle it as a targeted selection
        if ($request->has('selected_contacts') && !empty($request->selected_contacts)) {
            $query->whereIn('id', $request->selected_contacts);
        } elseif ($request->audience_type === 'TAGS' && $request->has('selected_tags')) {
            $query->where(function($q) use ($request) {
                foreach ($request->selected_tags as $tag) {
                    $q->orWhereJsonContains('tags', $tag);
                }
            });
        }

        $targetContacts = $query->get();

        if ($targetContacts->isEmpty()) {
            return redirect()->back()->with('error', 'No contacts found for the selected audience.');
        }

        \Illuminate\Support\Facades\Log::info("Campaign Store Request Data - EXECUTION CHECK", [
            'variables_mapping' => $request->variables_mapping
        ]);

        $campaign = Campaign::create([
            'org_id' => $user->org_id,
            'name' => $request->name,
            'template_name' => $request->template_name,
            'language' => $request->language,
            'status' => 'SENDING',
            'total_contacts' => $targetContacts->count(),
            'variables_mapping' => $request->variables_mapping ?? [],
        ]);

        // Create campaign contacts
        foreach ($targetContacts as $contact) {
            \App\Models\CampaignContact::create([
                'campaign_id' => $campaign->id,
                'contact_id' => $contact->id,
                'status' => 'PENDING',
            ]);
        }

        // Option: Try to send the first contact synchronously to bypass queue stale code issues
        // and confirm it works immediately.
        try {
            \App\Jobs\SendCampaignJob::dispatchSync($campaign);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Immediate Campaign Send Error: " . $e->getMessage());
            // It will fail gracefully if it doesn't work, and the rest might go as usual.
        }
        
        return redirect()->route('whatsapp.campaigns.index')
            ->with('success', "Campaign '{$campaign->name}' created and broadcast initiated to {$campaign->total_contacts} contacts.");
    }

    /**
     * Get detailed report for a specific campaign.
     */
    public function report(Campaign $campaign)
    {
        abort_if($campaign->org_id !== request()->user()->org_id, 403);

        \Illuminate\Support\Facades\Log::info("Sync-check: Debugging campaign report for ID: {$campaign->id}");

        $contacts = \App\Models\CampaignContact::where('campaign_id', $campaign->id)
            ->with(['contact:id,name,phone_number'])
            ->get()
            ->map(function ($cc) use ($campaign) {
                $components = [];
                $rawMapping = (array)($campaign->variables_mapping ?? []);
                if (!empty($rawMapping)) {
                    $parameters = [];
                    // Ensure keys are treated numerically for sorting
                    $indices = array_keys($rawMapping);
                    sort($indices, SORT_NUMERIC);

                    foreach ($indices as $idx) {
                        $mapping = $rawMapping[$idx] ?? null;
                        if (!$mapping) continue;

                        $textVal = 'Customer';
                        if (($mapping['type'] ?? '') === 'contact') {
                            $field = $mapping['value'] ?? 'name';
                            $textVal = $cc->contact->{$field} ?? 'Customer';
                        } else {
                            $textVal = $mapping['value'] ?? 'Customer';
                        }

                        if (empty(trim((string)$textVal))) {
                            $textVal = 'Customer';
                        }

                        $parameters[] = [
                            'type' => 'text',
                            'text' => (string)$textVal
                        ];
                    }

                    if (!empty($parameters)) {
                        $components[] = [
                            'type' => 'body',
                            'parameters' => $parameters
                        ];
                    }
                }

                $errorRaw = $cc->error;
                $reason = null;
                if (is_array($errorRaw) || is_object($errorRaw)) {
                    $reason = $errorRaw['error']['message'] ?? $errorRaw['message'] ?? json_encode($errorRaw);
                } elseif (is_string($errorRaw) && !empty($errorRaw)) {
                    // Try to decode if it's a JSON string
                    $decoded = json_decode($errorRaw, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $reason = $decoded['error']['message'] ?? $decoded['message'] ?? $errorRaw;
                    } else {
                        $reason = $errorRaw;
                    }
                }

                return [
                    'id' => $cc->id,
                    'name' => $cc->contact->name ?? 'Unknown',
                    'phone' => $cc->contact->phone_number ?? 'Unknown',
                    'status' => $cc->status,
                    'reason' => (string)$reason,
                    'time' => $cc->updated_at->diffForHumans(),
                ];
            });

        return response()->json([
            'campaign' => $campaign,
            'contacts' => $contacts,
            'stats' => [
                'sent' => $campaign->sent_count,
                'delivered' => $campaign->delivered_count,
                'read' => $campaign->read_count,
                'replied' => $campaign->replied_count,
                'failed' => $campaign->failed_count,
                'total' => $campaign->total_contacts,
                'sending' => $campaign->status === 'SENDING' ? $campaign->total_contacts - $campaign->sent_count : 0,
                'processing' => $campaign->status === 'PROCESSING' ? 1 : 0,
                'queued' => $campaign->status === 'SCHEDULED' ? 1 : 0,
            ]
        ]);
    }

    /**
     * Get the actual template structure from Meta API.
     */
    public function getTemplateDetails(Campaign $campaign)
    {
        abort_if($campaign->org_id !== request()->user()->org_id, 403);
        $config = WhatsappConfig::where('org_id', $campaign->org_id)->first();

        if (!$config || !$config->access_token || !$config->waba_id) {
            return response()->json(['error' => 'WhatsApp configuration missing.'], 403);
        }

        try {
            $response = Http::withToken($config->access_token)
                ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates", [
                    'name' => $campaign->template_name
                ]);

            if ($response->successful()) {
                $templates = $response->json()['data'] ?? [];
                // Filter by name again just in case Meta API search is loose
                $template = collect($templates)->firstWhere('name', $campaign->template_name);
                
                if ($template) {
                    return response()->json($template);
                }
            }
            
            Log::error("Template Fetch Failed: " . $response->body());
            return response()->json(['error' => 'Template not found on Meta.'], 404);
        } catch (\Exception $e) {
            Log::error("Template Fetch Exception: " . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch template.'], 500);
        }
    }

    /**
     * Sync campaign statistics with underlying message logs (Manual refresh).
     */
    public function sync(Campaign $campaign)
    {
        abort_if($campaign->org_id !== request()->user()->org_id, 403);

        $campaignContacts = CampaignContact::where('campaign_id', $campaign->id)->get();
        
        $sent = 0;
        $delivered = 0;
        $read = 0;
        $replied = 0;
        $failed = 0;

        foreach ($campaignContacts as $cc) {
            if (!$cc->message_id) continue;

            $message = Message::where('wam_id', $cc->message_id)->first();
            if ($message) {
                // Update CampaignContact status if Message status changed
                $newStatus = strtoupper($message->status);
                if ($cc->status !== 'REPLIED') { // Don't downgrade from REPLIED
                    $cc->update(['status' => $newStatus]);
                }

                // Check for replies separately (Messages table direction inbound after campaign sent)
                $hasReply = Message::where('contact_id', $cc->contact_id)
                    ->where('direction', 'inbound')
                    ->where('created_at', '>', $cc->created_at)
                    ->exists();
                
                if ($hasReply) {
                    $cc->update(['status' => 'REPLIED']);
                }
            }

            // Tally based on latest CampaignContact status
            if (in_array($cc->status, ['SENT', 'DELIVERED', 'READ', 'REPLIED'])) $sent++;
            if (in_array($cc->status, ['DELIVERED', 'READ', 'REPLIED'])) $delivered++;
            if (in_array($cc->status, ['READ', 'REPLIED'])) $read++;
            if ($cc->status === 'REPLIED') $replied++;
            if ($cc->status === 'FAILED') $failed++;
        }

        $campaign->update([
            'sent_count' => $sent,
            'delivered_count' => $delivered,
            'read_count' => $read,
            'replied_count' => $replied,
            'failed_count' => $failed,
        ]);

        return redirect()->back()->with('success', "Campaign statistics refreshed successfully.");
    }
}
