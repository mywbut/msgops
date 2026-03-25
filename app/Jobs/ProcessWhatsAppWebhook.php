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
            $entries = $this->payload['entry'] ?? [];
            Log::info("Processing WhatsApp Webhook Payload with " . count($entries) . " entries.");

            foreach ($entries as $entry) {
                $changes = $entry['changes'] ?? [];
                foreach ($changes as $change) {
                    $value = $change['value'] ?? null;
                    if (!$value) continue;

                    $this->processChange($value);
                }
            }
        } catch (\Exception $e) {
            Log::error("Failed to process WhatsApp Webhook Job: " . $e->getMessage(), [
                'exception' => $e
            ]);
        }
    }

    /**
     * Process a single change value from the webhook.
     */
    private function processChange(array $value): void
    {
        $metadata = $value['metadata'] ?? null;
        $messages = $value['messages'] ?? null;
        $statuses = $value['statuses'] ?? null;

        // 1. Handle Status Updates (sent, delivered, read, failed)
        if ($statuses && isset($statuses[0])) {
            foreach ($statuses as $statusData) {
                $this->handleStatusUpdate($statusData, $metadata);
            }
            return;
        }

        // 2. Handle Incoming Messages
        if ($messages && isset($messages[0])) {
            $incomingPhoneNumberId = $metadata['phone_number_id'] ?? null;
            if (!$incomingPhoneNumberId) {
                Log::warning("Webhook value missing phone_number_id metadata.");
                return;
            }

            // Find the Organization (Tenant) based on phone_number_id
            $config = WhatsappConfig::where('phone_number_id', $incomingPhoneNumberId)->first();
            if (!$config) {
                Log::warning("Webhook received for unknown phone_number_id: {$incomingPhoneNumberId}");
                return;
            }

            foreach ($messages as $index => $messageData) {
                $contactInfo = $value['contacts'][$index] ?? ($value['contacts'][0] ?? null);
                $this->handleIncomingMessage($messageData, $contactInfo, $config);
            }
        }
    }

    /**
     * Handle a status update for a message.
     */
    private function handleStatusUpdate(array $statusData, ?array $metadata): void
    {
        $message = Message::where('wam_id', $statusData['id'])->first();

        // Credit Deduction Logic (Aggregator Model)
        if (isset($statusData['pricing']) && $statusData['pricing']['billable']) {
            $phoneId = $metadata['phone_number_id'] ?? null;
            $org = WhatsappConfig::where('phone_number_id', $phoneId)->first()?->organization;

            if ($org) {
                $category = $statusData['pricing']['category'] ?? 'utility';
                $cost = 0.10; // Platform Service Fee
                $org->withdraw($cost, $category, "Service Fee: " . ucfirst($category));
                Log::info("Deducted {$cost} from Org {$org->id} for {$category} conversation.");
            }
        }

        if ($message) {
            $updateData = ['status' => $statusData['status']];
            if (isset($statusData['errors'])) {
                $updateData['error'] = $statusData['errors'][0];
            }
            $message->update($updateData);
        }
    }

    /**
     * Handle an incoming message from a contact.
     */
    private function handleIncomingMessage(array $messageData, ?array $contactInfo, WhatsappConfig $config): void
    {
        $from = $messageData['from'];
        $type = $messageData['type'];
        $orgId = $config->org_id;

        // Extract Message Body/Content
        $msgBody = null;
        if ($type === 'text') {
            $msgBody = $messageData['text']['body'] ?? null;
        } elseif ($type === 'interactive') {
            $interactive = $messageData['interactive'];
            $msgBody = $interactive['button_reply']['title'] ?? $interactive['list_reply']['title'] ?? "[Interactive Message]";
        } elseif ($type === 'button') {
            $msgBody = $messageData['button']['text'] ?? "[Button Click]";
        } else {
            $msgBody = "[" . ucfirst($type) . " message]";
        }

        Log::info("Handling incoming {$type} message from {$from} for Org {$orgId}");

        // 1. Upsert Contact in CRM
        $contact = Contact::updateOrCreate(
            ['org_id' => $orgId, 'phone_number' => $from],
            [
                'name' => $contactInfo['profile']['name'] ?? 'Unknown',
                'last_message_at' => now()
            ]
        );

        // 2. Log Inbound Message
        Message::create([
            'org_id' => $orgId,
            'contact_id' => $contact->id,
            'wam_id' => $messageData['id'],
            'direction' => 'inbound',
            'type' => $type,
            'content' => ['body' => $msgBody, 'raw' => $messageData],
            'status' => 'delivered',
            'created_at' => now(), // Explicitly set created_at
        ]);

        // 3. Send Auto-Reply (MVP Logic)
        $input = trim(strtolower($msgBody ?? ''));
        if ($input === '') return;

        $replyText = "Received: '{$msgBody}'. Exploring msgops.in SaaS Platform!";
        if (in_array($input, ['hi', 'hello'])) {
            $replyText = "Hello! I am your automated SaaS assistant.";
        }

        $this->sendWhatsAppMessage($from, $replyText, $config);

        // 4. Log Outbound Message
        Message::create([
            'org_id' => $orgId,
            'contact_id' => $contact->id,
            'direction' => 'outbound',
            'type' => 'text',
            'content' => ['body' => $replyText],
            'status' => 'sent',
            'created_at' => now(), // Explicitly set created_at
        ]);
    }

    /**
     * Helper to send WhatsApp API Request
     */
    private function sendWhatsAppMessage($to, $text, $config)
    {
        $url = "https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages";

        try {
            Http::withToken($config->access_token)->post($url, [
                'messaging_product' => 'whatsapp',
                'recipient_type' => 'individual',
                'to' => $to,
                'type' => 'text',
                'text' => ['body' => $text],
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to send WhatsApp reply: " . $e->getMessage());
        }
    }
}
