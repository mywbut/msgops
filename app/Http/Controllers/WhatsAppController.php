<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Message;
use App\Models\WhatsappConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppController extends Controller
{
    /**
     * Send a WhatsApp message using the Meta API.
     */
    public function sendMessage(Request $request)
    {
        $request->validate([
            'recipient' => 'required|string',
            'message' => 'required|string',
            // template is optional for this demo
            'template' => 'nullable|string',
        ]);

        $user = $request->user();
        $config = WhatsappConfig::where('org_id', $user->org_id)->first();

        if (!$config) {
            return response()->json(['error' => 'WhatsApp account is not connected.'], 403);
        }

        $recipient = preg_replace('/[^0-9]/', '', $request->input('recipient'));
        $messageBody = $request->input('message');

        try {
            // For a newly registered number that hasn't cleared full review, 
            // you might only be able to send to pre-registered test numbers,
            // OR you must use a pre-approved template to initiate a conversation.
            // For this screencast, we will attempt to send a free-form message. 
            // If it fails because the window is closed, they need to reply to the business number first.

            // --- TEMPORARY CREDENTIALS FOR META APP REVIEW SCREENCAST ---
            // Unapproved numbers can ONLY send pre-approved templates or reply within 24 hours.
            // If the user selected the Meta Test Template, send that. Otherwise, send free-form text 
            // (Note: free-form text will be silently dropped by Meta unless the recipient replied first).

            if ($request->input('template') === 'hello_world') {
                $payload = [
                    'messaging_product' => 'whatsapp',
                    'to' => $recipient,
                    'type' => 'template',
                    'template' => [
                        'name' => 'hello_world',
                        'language' => ['code' => 'en_US']
                    ]
                ];
            } else {
                $payload = [
                    'messaging_product' => 'whatsapp',
                    'recipient_type' => 'individual',
                    'to' => $recipient,
                    'type' => 'text',
                    'text' => [
                        'preview_url' => false,
                        'body' => $messageBody
                    ]
                ];
            }

            // Use the live connected configuration from the database!
            $response = Http::withToken($config->access_token)
                ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages", $payload);

            if ($response->failed()) {
                Log::error('Send Message Failed: ' . $response->body());
                return response()->json([
                    'error' => 'Failed to send message via Meta API.',
                    // Include the exact error string so the frontend displays it for the user
                    'details' => json_decode($response->body(), true)['error']['message'] ?? $response->body()
                ], $response->status());
            }

            Log::info("Meta Success Payload: " . json_encode($payload) . " || Response: " . $response->body());

            // 1. Ensure the recipient exists in the CRM
            $contact = Contact::firstOrCreate(
                ['org_id' => $user->org_id, 'phone_number' => $recipient],
                ['name' => 'Unknown']
            );

            // 2. Log Outbound Message
            Message::create([
                'org_id' => $user->org_id,
                'contact_id' => $contact->id,
                'wam_id' => $response->json()['messages'][0]['id'] ?? null,
                'direction' => 'outbound',
                'type' => $request->input('template') ? 'template' : 'text',
                'content' => ['body' => $request->input('template') ?: $messageBody],
                'status' => 'sent',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Message successfully sent to Meta API!',
                'data' => $response->json()
            ]);

        } catch (\Exception $e) {
            Log::error('SendMessage Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server error occurred while sending message.'], 500);
        }
    }
}
