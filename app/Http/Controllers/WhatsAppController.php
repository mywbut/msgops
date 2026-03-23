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
        $request->validate([
            'recipients' => 'required|array',
            'recipients.*' => 'required|string',
            'type' => 'required|in:text,template,image,document',
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

                switch ($request->type) {
                    case 'template':
                        $payload['type'] = 'template';
                        $payload['template'] = [
                            'name' => $request->template_name,
                            'language' => ['code' => $request->template_language ?? 'en_US']
                        ];
                        break;
                    case 'image':
                        $payload['type'] = 'image';
                        $payload['image'] = ['link' => $request->media_url];
                        break;
                    case 'document':
                        $payload['type'] = 'document';
                        $payload['document'] = [
                            'link' => $request->media_url,
                            'filename' => basename($request->media_url) ?: 'document.pdf'
                        ];
                        break;
                    default:
                        $payload['type'] = 'text';
                        $payload['text'] = ['body' => $request->message];
                        break;
                }

                $response = Http::withToken($config->access_token)
                    ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages", $payload);

                if ($response->successful()) {
                    $results['success_count']++;
                    
                    // CRM Upsert & Logging
                    $contact = Contact::firstOrCreate(
                        ['org_id' => $user->org_id, 'phone_number' => $recipient],
                        ['name' => 'Unknown']
                    );

                    Message::create([
                        'org_id' => $user->org_id,
                        'contact_id' => $contact->id,
                        'wam_id' => $response->json()['messages'][0]['id'] ?? null,
                        'direction' => 'outbound',
                        'type' => $request->type,
                        'content' => [
                            'body' => $request->message ?? "Sent {$request->type}",
                            'media_url' => $request->media_url,
                            'template' => $request->template_name
                        ],
                        'status' => 'sent',
                    ]);
                } else {
                    $results['fail_count']++;
                    $results['errors'][] = "Recipient {$recipient}: " . ($response->json()['error']['message'] ?? 'Unknown API error');
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
