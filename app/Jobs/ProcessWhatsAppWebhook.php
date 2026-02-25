<?php

namespace App\Jobs;

use App\Models\Contact;
use App\Models\Message;
use App\Models\WhatsappConfig;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProcessWhatsAppWebhook implements ShouldQueue
{
    use Queueable;

    protected $payload;

    /**
     * Create a new job instance.
     */
    public function __construct(array $payload)
    {
        $this->payload = $payload;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $entry = $this->payload['entry'][0]['changes'][0]['value'] ?? null;
            if (!$entry)
                return;

            $metadata = $entry['metadata'] ?? null;
            $messages = $entry['messages'] ?? null;

            if (!$metadata || !isset($metadata['phone_number_id']) || !$messages || !isset($messages[0])) {
                return;
            }

            $incomingPhoneNumberId = $metadata['phone_number_id'];
            $messageData = $messages[0];
            $from = $messageData['from'];
            $msgBody = $messageData['text']['body'] ?? null;

            if (!$msgBody)
                return;

            // 1. Find the Organization (Tenant) based on phone_number_id
            $config = WhatsappConfig::where('phone_number_id', $incomingPhoneNumberId)->first();

            if (!$config) {
                Log::warning("Webhook received for unknown phone_number_id: {$incomingPhoneNumberId}");
                return;
            }

            $orgId = $config->org_id;

            // 2. Upsert Contact in CRM
            $contact = Contact::updateOrCreate(
                ['org_id' => $orgId, 'phone_number' => $from],
                ['name' => $entry['contacts'][0]['profile']['name'] ?? 'Unknown']
            );

            // 3. Log Inbound Message
            Message::create([
                'org_id' => $orgId,
                'contact_id' => $contact->id,
                'wam_id' => $messageData['id'],
                'direction' => 'inbound',
                'type' => $messageData['type'],
                'content' => ['body' => $msgBody],
                'status' => 'delivered',
            ]);

            // 4. Send Auto-Reply (MVP Logic)
            $input = trim(strtolower($msgBody));
            $replyText = "Received: '{$msgBody}'. Exploring msgops.in SaaS Platform!";
            if (in_array($input, ['hi', 'hello'])) {
                $replyText = "Hello! I am your automated SaaS assistant.";
            }

            $this->sendWhatsAppMessage($from, $replyText, $config);

            // 5. Log Outbound Message
            Message::create([
                'org_id' => $orgId,
                'contact_id' => $contact->id,
                'direction' => 'outbound',
                'type' => 'text',
                'content' => ['body' => $replyText],
                'status' => 'sent',
            ]);

        } catch (\Exception $e) {
            Log::error("Failed to process WhatsApp Webhook: " . $e->getMessage());
        }
    }

    /**
     * Helper to send WhatsApp API Request
     */
    private function sendWhatsAppMessage($to, $text, $config)
    {
        $url = "https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages";

        Http::withToken($config->access_token)->post($url, [
            'messaging_product' => 'whatsapp',
            'recipient_type' => 'individual',
            'to' => $to,
            'type' => 'text',
            'text' => ['body' => $text],
        ]);
    }
}
