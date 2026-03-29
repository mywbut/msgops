<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Message;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WhatsAppController extends Controller
{
    /**
     * Show the Send Message interface.
     */
    public function showSendMessagePage(Request $request)
    {
        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();
        
        $templates = [];
        if ($config && $config->waba_id) {
            try {
                $response = Http::withToken($config->access_token)
                    ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates?limit=100");
                if ($response->successful()) {
                    $templates = $response->json()['data'] ?? [];
                }
            } catch (\Exception $e) {
                Log::error('Fetch Templates Error: ' . $e->getMessage());
            }
        }

        $contacts = Contact::where('org_id', $user->org_id)
            ->orderBy('name')
            ->get(['id', 'name', 'phone_number']);

        return Inertia::render('WhatsApp/SendMessage', [
            'isConnected' => $config ? true : false,
            'templates' => $templates,
            'contacts' => $contacts,
        ]);
    }

    /**
     * Send a WhatsApp message (Single or Bulk) using the Meta API.
     */
    public function sendMessage(Request $request)
    {
        Log::info("sendMessage hit", $request->all());
        $request->validate([
            'recipients' => 'required|array',
            'recipients.*' => 'required|string',
            'type' => 'required|in:text,template,image,document,video,audio,sticker',
            'message' => 'nullable|string',
            'template_name' => 'nullable|string',
            'template_language' => 'nullable|string',
            'media_url' => 'nullable|url',
        ]);

        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        if (!$config) {
            return response()->json(['error' => 'WhatsApp account is not connected.'], 403);
        }

        $results = [
            'success_count' => 0,
            'fail_count' => 0,
            'errors' => []
        ];

        foreach ($request->recipients as $rawRecipient) {
            $recipient = preg_replace('/[^0-9]/', '', $rawRecipient);
            if (empty($recipient)) continue;

            try {
                $payload = [
                    'messaging_product' => 'whatsapp',
                    'to' => $recipient,
                ];

                // Check if we need to upload to Meta (Localhost fixes)
                $mediaId = null;
                if ($request->media_url && in_array($request->type, ['image', 'video', 'audio', 'document', 'sticker'])) {
                    try {
                        // Extract relative path from URL
                        $storagePath = str_replace(asset('storage/'), '', $request->media_url);
                        $fullPath = storage_path("app/public/{$storagePath}");

                        if (file_exists($fullPath)) {
                            Log::info("Uploading local file to Meta: " . $fullPath);
                            $mediaResponse = Http::withToken($config->access_token)
                                ->attach('file', file_get_contents($fullPath), basename($fullPath))
                                ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/media", [
                                    'messaging_product' => 'whatsapp',
                                ]);

                            if ($mediaResponse->successful()) {
                                $mediaId = $mediaResponse->json()['id'];
                                Log::info("Meta Media Upload Success. ID: " . $mediaId);
                            } else {
                                Log::error("Meta Media Upload Failed: " . $mediaResponse->body());
                            }
                        }
                    } catch (\Exception $e) {
                        Log::error("Media Upload Pre-process Error: " . $e->getMessage());
                    }
                }

                switch ($request->type) {
                    case 'template':
                        $payload['type'] = 'template';
                        $payload['template'] = [
                            'name' => $request->template_name,
                            'language' => ['code' => $request->template_language ?? 'en_US']
                        ];
                        if ($request->has('template_components')) {
                            $payload['template']['components'] = $request->template_components;
                        }
                        break;
                    case 'image':
                        $payload['type'] = 'image';
                        $payload['image'] = [
                            'caption' => $request->message
                        ];
                        if ($mediaId) {
                            $payload['image']['id'] = $mediaId;
                        } else {
                            $payload['image']['link'] = $request->media_url;
                        }
                        break;
                    case 'video':
                        $payload['type'] = 'video';
                        $payload['video'] = [
                            'caption' => $request->message
                        ];
                        if ($mediaId) {
                            $payload['video']['id'] = $mediaId;
                        } else {
                            $payload['video']['link'] = $request->media_url;
                        }
                        break;
                    case 'audio':
                        $payload['type'] = 'audio';
                        if ($mediaId) {
                            $payload['audio']['id'] = $mediaId;
                        } else {
                            $payload['audio']['link'] = $request->media_url;
                        }
                        break;
                    case 'document':
                        $payload['type'] = 'document';
                        $payload['document'] = [
                            'filename' => basename($request->media_url) ?: 'document.pdf',
                            'caption' => $request->message
                        ];
                        if ($mediaId) {
                            $payload['document']['id'] = $mediaId;
                        } else {
                            $payload['document']['link'] = $request->media_url;
                        }
                        break;
                    case 'sticker':
                        $payload['type'] = 'sticker';
                        if ($mediaId) {
                            $payload['sticker']['id'] = $mediaId;
                        } else {
                            $payload['sticker']['link'] = $request->media_url;
                        }
                        break;
                    default:
                        $payload['type'] = 'text';
                        $payload['text'] = ['body' => $request->message];
                        break;
                }

                Log::info("Sending WhatsApp message to {$recipient} via Meta API", ['payload' => $payload]);

                $response = Http::withToken($config->access_token)
                    ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages", $payload);

                if ($response->successful()) {
                    Log::info("Meta API Success for {$recipient}: " . $response->body());
                    $results['success_count']++;
                    
                    // CRM Upsert & Logging
                    $contact = Contact::firstOrCreate(
                        ['org_id' => $user->org_id, 'phone_number' => $recipient],
                        ['name' => 'Unknown']
                    );

                    // Reconstruct full message structure for Inbox display
                    $renderedContent = [
                        'body' => $request->message ?? "Sent {$request->type}",
                        'header' => null,
                        'footer' => null,
                        'buttons' => []
                    ];

                    if ($request->type === 'template') {
                        try {
                            $templateResponse = Http::withToken($config->access_token)
                                ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates?name={$request->template_name}");
                            
                            if ($templateResponse->successful()) {
                                $templateData = $templateResponse->json()['data'][0] ?? null;
                                if ($templateData) {
                                    foreach ($templateData['components'] as $comp) {
                                        if ($comp['type'] === 'HEADER' && $comp['format'] === 'TEXT') {
                                            $renderedContent['header'] = $comp['text'];
                                        } elseif ($comp['type'] === 'BODY') {
                                            $renderedContent['body'] = $comp['text'];
                                            // Fill variables from template_components if provided
                                            if ($request->has('template_components')) {
                                                $params = collect($request->template_components)->where('type', 'body')->first()['parameters'] ?? [];
                                                foreach ($params as $idx => $p) {
                                                    $pNum = $idx + 1;
                                                    $renderedContent['body'] = str_replace("{{{$pNum}}}", $p['text'], $renderedContent['body']);
                                                }
                                            }
                                        } elseif ($comp['type'] === 'FOOTER') {
                                            $renderedContent['footer'] = $comp['text'];
                                        } elseif ($comp['type'] === 'BUTTONS') {
                                            $renderedContent['buttons'] = $comp['buttons'];
                                        }
                                    }
                                }
                            }
                        } catch (\Exception $e) {
                            Log::warning("Failed to render template structure in Controller: " . $e->getMessage());
                        }
                    }

                    $message = Message::create([
                        'org_id' => $user->org_id,
                        'contact_id' => $contact->id,
                        'wam_id' => $response->json()['messages'][0]['id'] ?? null,
                        'direction' => 'outbound',
                        'type' => $request->type,
                        'content' => array_merge($renderedContent, [
                            'media_url' => $request->media_url,
                            'template' => $request->template_name
                        ]),
                        'status' => 'sent',
                    ]);

                    $contact->update(['last_message_at' => now()]);
                } else {
                    Log::error("Meta API Failure for {$recipient}: " . $response->body());
                    $results['fail_count']++;
                    $errorData = $response->json();
                    $errorMsg = $errorData['error']['message'] ?? 'Unknown API error';
                    $results['errors'][] = "Recipient {$recipient}: " . $errorMsg;

                    // Log Failed Message with structure
                    $contact = Contact::firstOrCreate(
                        ['org_id' => $user->org_id, 'phone_number' => $recipient],
                        ['name' => 'Unknown']
                    );

                    Message::create([
                        'org_id' => $user->org_id,
                        'contact_id' => $contact->id,
                        'direction' => 'outbound',
                        'type' => $request->type,
                        'content' => [
                            'body' => $request->message ?? "Failed {$request->type}",
                            'template' => $request->template_name
                        ],
                        'status' => 'failed',
                        'error' => $errorData['error'] ?? ['message' => $errorMsg]
                    ]);
                }

            } catch (\Exception $e) {
                $results['fail_count']++;
                $results['errors'][] = "Recipient {$recipient}: " . $e->getMessage();
            }
        }

        return response()->json([
            'success' => $results['success_count'] > 0,
            'summary' => "Sent {$results['success_count']} successfully, {$results['fail_count']} failed.",
            'details' => $results
        ]);
    }
}
