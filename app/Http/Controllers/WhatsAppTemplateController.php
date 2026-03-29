<?php

namespace App\Http\Controllers;

use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
     * Show the form to edit/reuse an existing template.
     */
    public function edit(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();
        $name = $request->query('name');
        
        if (!$config || !$name) {
            return redirect()->route('whatsapp.templates.index')->with('error', 'Invalid request.');
        }

        try {
            // Fetch the template by name
            $response = Http::withToken($config->access_token)
                ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates", [
                    'name' => $name,
                    'limit' => 1
                ]);

            if ($response->successful()) {
                $templateData = $response->json()['data'][0] ?? null;
                
                if (!$templateData) {
                    return redirect()->route('whatsapp.templates.index')->with('error', 'Template not found on Meta.');
                }

                // Parse components back into our internal format
                $initialTemplate = [
                    'name' => $templateData['name'],
                    'category' => $templateData['category'],
                    'language' => $templateData['language'],
                    'header_type' => 'NONE',
                    'header_text' => '',
                    'header_handle' => '',
                    'body' => '',
                    'footer' => '',
                    'buttons' => [],
                    'body_examples' => []
                ];

                foreach ($templateData['components'] as $component) {
                    switch ($component['type']) {
                        case 'HEADER':
                            $initialTemplate['header_type'] = $component['format'];
                            if ($component['format'] === 'TEXT') {
                                $initialTemplate['header_text'] = $component['text'];
                            } elseif (isset($component['example']['header_handle'][0])) {
                                $initialTemplate['header_handle'] = $component['example']['header_handle'][0];
                            }
                            break;
                            
                        case 'BODY':
                            $initialTemplate['body'] = $component['text'];
                            break;
                            
                        case 'FOOTER':
                            $initialTemplate['footer'] = $component['text'];
                            break;
                            
                        case 'BUTTONS':
                            foreach ($component['buttons'] as $btn) {
                                $newBtn = [
                                    'type' => $btn['type'],
                                    'text' => $btn['text']
                                ];
                                if ($btn['type'] === 'URL') {
                                    $newBtn['url'] = $btn['url'];
                                } elseif ($btn['type'] === 'PHONE_NUMBER') {
                                    $newBtn['phone_number'] = $btn['phone_number'];
                                }
                                $initialTemplate['buttons'][] = $newBtn;
                            }
                            break;
                    }
                }

                return Inertia::render('WhatsApp/Templates/Create', [
                    'isConnected' => true,
                    'initialTemplate' => $initialTemplate,
                    'isEditing' => true
                ]);
            }
        } catch (\Exception $e) {
            Log::error('Template Edit Fetch Error: ' . $e->getMessage());
        }

        return redirect()->route('whatsapp.templates.index')->with('error', 'Failed to fetch template for editing.');
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
            'header_type' => 'nullable|in:NONE,TEXT,IMAGE,DOCUMENT,VIDEO',
            'header_text' => 'nullable|string|max:60',
            'body' => 'required|string|max:1024',
            'footer' => 'nullable|string|max:60',
            'buttons' => 'nullable|array|max:10',
        ]);

        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        if (!$config || !$config->waba_id || !$config->access_token) {
            return redirect()->back()->with('error', 'WhatsApp account is not connected.');
        }

        try {
            $components = [];

            // Add Header Component
            if ($request->header_type && $request->header_type !== 'NONE') {
                $header = [
                    'type' => 'HEADER',
                    'format' => $request->header_type,
                ];
                
                if ($request->header_type === 'TEXT') {
                    $header['text'] = $request->header_text;
                }

                // Add example for media headers (Meta requirement)
                if (in_array($request->header_type, ['IMAGE', 'VIDEO', 'DOCUMENT']) && $request->header_handle) {
                    $header['example'] = [
                        'header_url' => [$request->header_handle]
                    ];
                }
                
                $components[] = $header;
            }

            // Add Body Component
            $body = [
                'type' => 'BODY',
                'text' => $request->body,
            ];

            // Add example for body variables (Meta requirement)
            if ($request->body_examples && count($request->body_examples) > 0) {
                $body['example'] = [
                    'body_text' => [$request->body_examples]
                ];
            }

            $components[] = $body;

            // Add Footer Component
            if ($request->footer) {
                $components[] = [
                    'type' => 'FOOTER',
                    'text' => $request->footer,
                ];
            }

            // Add Buttons Component
            if ($request->buttons && count($request->buttons) > 0) {
                $buttons = [];
                foreach ($request->buttons as $btn) {
                    $button = [
                        'type' => $btn['type'],
                        'text' => $btn['text'],
                    ];
                    
                    if ($btn['type'] === 'URL') {
                        $button['url'] = $btn['url'];
                    } elseif ($btn['type'] === 'PHONE_NUMBER') {
                        $button['phone_number'] = $btn['phone_number'];
                    } elseif ($btn['type'] === 'COPY_CODE') {
                        $button['coupon_code'] = $btn['coupon_code'];
                    }

                    $buttons[] = $button;
                }
                $components[] = [
                    'type' => 'BUTTONS',
                    'buttons' => $buttons,
                ];
            }

            $payload = [
                'name' => $request->name,
                'language' => $request->language,
                'category' => $request->category,
                'components' => $components,
            ];

            $response = Http::withToken($config->access_token)
                ->post("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates", $payload);

            if ($response->successful()) {
                return redirect()->route('whatsapp.templates.index')->with('success', "Template '{$request->name}' created successfully and sent to Meta for approval.");
            }

            Log::error('Template Creation Failed: ' . $response->body());
            $errorData = $response->json();
            $errorMsg = $errorData['error']['message'] ?? 'Failed to create template on Meta.';
            
            return redirect()->back()->with('error', $errorMsg)->withInput();
            
        } catch (\Exception $e) {
            Log::error('Template Creation Exception: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Server error occurred while creating template.');
        }
    }

    /**
     * Upload media sample for template approval.
     */
    public function uploadMedia(Request $request)
    {
        Log::info('Incoming Media Upload Request', [
            'has_file' => $request->hasFile('file'),
            'content_type' => $request->header('Content-Type')
        ]);

        $request->validate([
            'file' => 'required|file|max:16384', // 16MB max
        ]);

        try {
            $file = $request->file('file');
            $extension = $file->getClientOriginalExtension();
            $filename = 'sample_' . time() . '_' . uniqid() . '.' . $extension;
            
            // Store in public/whatsapp_samples
            $path = $file->storeAs('whatsapp_samples', $filename, 'public');
            $url = url(Storage::url($path));

            return response()->json([
                'success' => true,
                'url' => $url
            ]);
        } catch (\Exception $e) {
            Log::error('Media Upload Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload media sample.'
            ], 500);
        }
    }

    /**
     * "Sync" templates (redirects back to index which automatically fetches latest templates from Meta)
     */
    public function sync(Request $request)
    {
        // Add any local DB synchronization logic here in the future if templates are stored locally.
        // Currently, index() fetches directly from the Meta API, so a redirect is sufficient to refresh.
        return redirect()->route('whatsapp.templates.index')->with('success', 'Templates successfully synced with Meta.');
    }
}
