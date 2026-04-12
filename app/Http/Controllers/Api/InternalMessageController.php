<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhatsappConfig;
use App\Models\Contact;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InternalMessageController extends Controller
{
    /**
     * Send a template-based WhatsApp message from an external trusted source.
     */
    public function sendTemplate(Request $request)
    {
        $apiKey = $request->header('X-Internal-API-Key');
        
        if ($apiKey !== env('INTERNAL_API_KEY')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'phone' => 'required|string',
            'template' => 'required|string',
            'language' => 'nullable|string',
            'components' => 'nullable|array',
            'org_id' => 'required', // We use this to find the right WABA config
        ]);

        $config = WhatsappConfig::where('org_id', $request->org_id)->first();

        if (!$config || !$config->access_token || !$config->phone_number_id) {
            return response()->json(['error' => 'WhatsApp configuration not found for this organization'], 404);
        }

        // Clean phone number
        $phone = preg_replace('/[^0-9]/', '', $request->phone);

        // [NEW] Find or Create Contact for Logging
        $contact = Contact::firstOrCreate(
            ['org_id' => $request->org_id, 'phone_number' => $phone],
            ['name' => 'Automated Tenant']
        );

        // [NEW] Initialize Message Record (for UI Visibility)
        $messageModel = Message::create([
            'org_id' => $request->org_id,
            'contact_id' => $contact->id,
            'direction' => 'outbound',
            'type' => 'template',
            'content' => ['body' => "Automation: {$request->template}"],
            'status' => 'pending',
            'sender_type' => 'system'
        ]);

        $payload = [
            'messaging_product' => 'whatsapp',
            'to' => $phone,
            'type' => 'template',
            'template' => [
                'name' => $request->template,
                'language' => [
                    'code' => $request->language ?? 'en_US'
                ],
                'components' => $request->components ?? []
            ]
        ];

        try {
            Log::info("Internal WhatsApp Send Request for Org: " . $request->org_id, ['to' => $phone]);

            $response = Http::withToken($config->access_token)
                ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages", $payload);

            if ($response->successful()) {
                $whatsappId = $response->json()['messages'][0]['id'] ?? null;
                
                // Update Message Log
                $messageModel->update([
                    'status' => 'sent',
                    'wam_id' => $whatsappId
                ]);

                return response()->json([
                    'success' => true,
                    'message_id' => $whatsappId
                ]);
            }

            $errorBody = $response->json();
            
            // Update Message Log as Failed
            $messageModel->update([
                'status' => 'failed',
                'error' => $errorBody
            ]);

            Log::error("Gateway Meta API Error: " . $response->body());
            return response()->json([
                'success' => false,
                'error' => $errorBody['error']['message'] ?? 'Meta API error'
            ], 400);

        } catch (\Exception $e) {
            $messageModel->update([
                'status' => 'failed',
                'error' => ['message' => $e->getMessage()]
            ]);

            Log::error("Gateway Exception: " . $e->getMessage());
            return response()->json(['error' => 'Gateway Exception: ' . $e->getMessage()], 500);
        }
    }
}
