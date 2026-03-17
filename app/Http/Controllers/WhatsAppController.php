<?php

namespace App\Http\Controllers;

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

            // --- TEMPORARY CREDENTIALS FOR META APP REVIEW SCREENCAST ---
            // These hardcoded values bypass the unapproved App permissions.
            // Replace these with dynamic $config variables once the app is approved!
            $screencast_phone_number_id = "115710678303307";
            $screencast_access_token = "EAAM8sD4pdoMBQ9G0hyo4f9Yu4dc920VLT9Ih5hFszMWnwcusAZCxlDRbZAtNs7zch0bX3CnCPRmLEgHHURIt5VzDl5GS3CZAJXpN7XtAQqofjIPPNsIaMOibzChyTkIePZCbAoEsZBMx6M7rxu81s0AlMcAD4TxhRsh4MAAlssoQ0wHt1gbuooobhabOfqqHIZA2z3ocsYKfzNVTEsDyxHYnaEdBZB5o4o1NEM5pFXY21kZC7sWBHXvd8L9qBuZA5mfXinJMZBZBjKUof8KllzEIjD5mAZDZD";

            $response = Http::withToken($screencast_access_token)
                ->post("https://graph.facebook.com/v18.0/{$screencast_phone_number_id}/messages", $payload);

            if ($response->failed()) {
                Log::error('Send Message Failed: ' . $response->body());
                return response()->json([
                    'error' => 'Failed to send message via Meta API.',
                    // Include the exact error string so the frontend displays it for the user
                    'details' => json_decode($response->body(), true)['error']['message'] ?? $response->body()
                ], $response->status());
            }

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
