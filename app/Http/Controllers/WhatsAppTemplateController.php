<?php

namespace App\Http\Controllers;

use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WhatsAppTemplateController extends Controller
{
    /**
     * List all templates from Meta Graph API.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();
        
        $templates = [];
        $error = null;

        if ($config && $config->waba_id && $config->access_token) {
            try {
                // Fetch up to 100 templates
                $response = Http::withToken($config->access_token)
                    ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates?limit=100");
                
                if ($response->successful()) {
                    $templates = $response->json()['data'] ?? [];
                } else {
                    $error = json_decode($response->body(), true)['error']['message'] ?? 'Failed to fetch templates from Meta.';
                    Log::error('Template Fetch Failed: ' . $response->body());
                }
            } catch (\Exception $e) {
                $error = 'Server error occurred while fetching templates.';
                Log::error('Template Fetch Error: ' . $e->getMessage());
            }
        }

        return Inertia::render('WhatsApp/Templates/Index', [
            'isConnected' => $config ? true : false,
            'templates' => $templates,
            'apiError' => $error,
            'success' => session('success'),
            'flashError' => session('error'),
        ]);
    }

    /**
     * Show the form to create a new template.
     */
    public function create(Request $request)
    {
        $config = WhatsappConfig::where('org_id', $request->user()->org_id)->first();
        return Inertia::render('WhatsApp/Templates/Create', [
            'isConnected' => $config ? true : false,
            'flashError' => session('error')
        ]);
    }

    /**
     * Store a newly created template on Meta.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|regex:/^[a-z0-9_]+$/|max:512',
            'category' => 'required|in:MARKETING,UTILITY,AUTHENTICATION',
            'language' => 'required|string|max:10',
            'body' => 'required|string|max:1024',
        ]);

        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        if (!$config || !$config->waba_id || !$config->access_token) {
            return redirect()->back()->with('error', 'WhatsApp account is not connected.');
        }

        try {
            $payload = [
                'name' => $request->name,
                'language' => $request->language,
                'category' => $request->category,
                'components' => [
                    [
                        'type' => 'BODY',
                        'text' => $request->body
                    ]
                ]
            ];

            $response = Http::withToken($config->access_token)
                ->post("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates", $payload);

            if ($response->successful()) {
                return redirect()->route('whatsapp.templates.index')->with('success', "Template '{$request->name}' created successfully and sent to Meta for approval.");
            }

            Log::error('Template Creation Failed: ' . $response->body());
            $errorMsg = json_decode($response->body(), true)['error']['message'] ?? 'Failed to create template on Meta.';
            
            return redirect()->back()->with('error', $errorMsg)->withInput();
            
        } catch (\Exception $e) {
            Log::error('Template Creation Exception: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Server error occurred while creating template.');
        }
    }
}
