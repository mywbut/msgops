<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessWhatsAppWebhook;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    /**
     * Verify the webhook via Meta's challenge request.
     */
    public function verify(Request $request)
    {
        // For SaaS, you might check this against a specific client's token,
        // or a global token set in your App Dashboard.
        $verifyToken = env('WHATSAPP_VERIFY_TOKEN', 'my_secret_token_123');

        $mode = $request->query('hub_mode');
        $token = $request->query('hub_verify_token');
        $challenge = $request->query('hub_challenge');

        if ($mode === 'subscribe' && $token === $verifyToken) {
            return response($challenge, 200);
        }

        return response('Forbidden', 403);
    }

    /**
     * Receive the incoming message payload from Meta.
     */
    public function handle(Request $request)
    {
        $payload = $request->all();

        // 1. Immediately acknowledge receipt to Meta!
        // If we don't return 200 within a few seconds, Meta stops sending webhooks.

        // 2. Dispatch a background Job to process the message payload.
        if (isset($payload['object']) && $payload['object'] === 'whatsapp_business_account') {
            ProcessWhatsAppWebhook::dispatch($payload);
        }

        return response('EVENT_RECEIVED', 200);
    }
}
