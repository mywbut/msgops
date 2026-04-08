<?php

namespace App\Jobs;

use App\Models\Contact;
use App\Models\Message;
use App\Models\WhatsappConfig;
use App\Models\AutomationRule;
use App\Models\ReplyMaterial;
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
            $config = WhatsappConfig::where('phone_number_id', $incomingPhoneNumberId)->first() 
                     ?? WhatsappConfig::first(); // Smarter fallback for debugging/demo environments

            if (!$config) {
                return;
            }

            foreach ($messages as $index => $messageData) {
                $contactInfo = $value['contacts'][$index] ?? ($value['contacts'][0] ?? null);
                $this->handleIncomingMessage($messageData, $contactInfo, $config, $metadata);
            }
        }
    }

    /**
     * Handle a status update for a message.
     */
    private function handleStatusUpdate(array $statusData, ?array $metadata): void
    {
        $message = Message::where('wam_id', $statusData['id'])->first();

        // Credit Deduction Logic Removed: Platform is now service-fee free.
        // We only track statuses without deducting wallet balances.

        if ($message) {
            $prevStatus = $message->status;
            $newStatus = $statusData['status'];
            
            $updateData = ['status' => $newStatus];
            if (isset($statusData['errors'])) {
                $updateData['error'] = $statusData['errors'][0];
            }
            $message->update($updateData);

            // Link to Campaign System
            $campaignContact = \App\Models\CampaignContact::where('message_id', $statusData['id'])->first();
            if ($campaignContact) {
                $campaign = $campaignContact->campaign;
                
                // State machine to prevent double counting
                if ($newStatus === 'delivered' && $campaignContact->status === 'SENT') {
                    $campaignContact->update(['status' => 'DELIVERED']);
                    $campaign->increment('delivered_count');
                } elseif ($newStatus === 'read' && $campaignContact->status !== 'READ') {
                    // If it was SENT (missed delivered webhook), increment delivered too
                    if ($campaignContact->status === 'SENT') {
                        $campaign->increment('delivered_count');
                    }
                    $campaignContact->update(['status' => 'READ']);
                    $campaign->increment('read_count');
                } elseif ($newStatus === 'failed' && $campaignContact->status !== 'FAILED') {
                    $campaignContact->update(['status' => 'FAILED', 'error' => json_encode($statusData['errors'] ?? [])]);
                    $campaign->increment('failed_count');
                }
            }
        }
    }

    /**
     * Handle an incoming message from a contact.
     */
    public function handleIncomingMessage(array $messageData, ?array $contactInfo, WhatsappConfig $config, ?array $metadata = null): void
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
            'content' => ['body' => $msgBody, 'raw' => array_merge($messageData, ['metadata' => $metadata])],
            'status' => 'delivered',
            'created_at' => now(), // Explicitly set created_at
        ]);

        // 3. Automation Rules Engine
        $this->processAutomationRules($contact, $msgBody, $config);

        $contact->update(['last_message_at' => now()]);
    }

    /**
     * Process all active automation rules for an organization.
     */
    public function processAutomationRules(Contact $contact, ?string $msgBody, WhatsappConfig $config): void
    {
        // Fetch all rules for the org and filter in PHP to avoid PostgreSQL boolean type issues
        $rules = AutomationRule::whereRaw("org_id::text = ?", [(string)$config->org_id])
            ->where('trigger_type', 'message_received')
            ->get()
            ->filter(fn($r) => $r->is_active === true);

        foreach ($rules as $rule) {
            if ($this->shouldTriggerRule($rule, $msgBody)) {
                $this->executeRuleActions($rule, $contact, $config);
                
                // Track execution
                $rule->increment('executed_count');
                $rule->update(['last_executed_at' => now()]);
            }
        }
    }

    /**
     * Determine if a rule should be triggered based on its config and the message body.
     */
    private function shouldTriggerRule(AutomationRule $rule, ?string $msgBody): bool
    {
        $config = $rule->trigger_config;
        if (!$config || !isset($config['keywords']) || empty($config['keywords'])) {
            return true; // No keywords = trigger on every message
        }

        $input = trim(strtolower($msgBody ?? ''));
        if ($input === '') {
            Log::debug("Automation: Empty message body, skipping.");
            return false;
        }

        $method = $config['matching_method'] ?? 'contains';
        $keywords = array_map('strtolower', (array)$config['keywords']);
        $threshold = $config['threshold'] ?? 0.8;

        Log::debug("Automation: Checking rule '{$rule->name}' (ID: {$rule->id}) - Input: '{$input}', Method: {$method}, Keywords: " . json_encode($keywords));

        foreach ($keywords as $keyword) {
            $keyword = trim($keyword);
            if ($keyword === '') continue;

            if ($method === 'exact') {
                if ($input === $keyword) {
                    Log::info("Automation: Exact match found for keyword '{$keyword}'");
                    return true;
                }
            } elseif ($method === 'fuzzy') {
                $distance = levenshtein($input, $keyword);
                $maxLength = max(strlen($input), strlen($keyword));
                if ($maxLength === 0) continue;
                $similarity = 1 - ($distance / $maxLength);
                if ($similarity >= $threshold) {
                    Log::info("Automation: Fuzzy match found for keyword '{$keyword}' (Similarity: {$similarity})");
                    return true;
                }
            } else { // default: contains
                if (str_contains($input, $keyword)) {
                    Log::info("Automation: Contains match found for keyword '{$keyword}'");
                    return true;
                }
            }
        }

        Log::debug("Automation: No match found for rule '{$rule->name}'");
        return false;
    }

    /**
     * Execute all actions defined for a rule.
     */
    public function executeRuleActions(AutomationRule $rule, Contact $contact, WhatsappConfig $config): void
    {
        $actions = (array)$rule->action_config;

        foreach ($actions as $action) {
            $type = $action['type'] ?? null;
            $materialId = $action['reply_material_id'] ?? null;

            if ($type === 'send_message' && $materialId) {
                $material = ReplyMaterial::find($materialId);
                if ($material) {
                    $this->sendReplyMaterial($contact->phone_number, $material, $config, $contact);
                }
            }
        }
    }

    /**
     * Send a specific reply material to a contact.
     */
    private function sendReplyMaterial(string $to, ReplyMaterial $material, WhatsappConfig $config, Contact $contact): void
    {
        $content = $material->content;
        $type = $material->type; // text, image, video, document

        // Prepare Meta API Payload
        $payload = [
            'messaging_product' => 'whatsapp',
            'recipient_type' => 'individual',
            'to' => $to,
        ];

        if ($type === 'text') {
            $payload['type'] = 'text';
            $payload['text'] = ['body' => $content['body'] ?? ''];
        } elseif (in_array($type, ['image', 'video', 'document', 'audio', 'sticker'])) {
            $payload['type'] = $type;
            $payload[$type] = [
                'link' => $content['url'] ?? $content['link'] ?? '',
                'caption' => $content['caption'] ?? null
            ];
        }

        $url = "https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages";

        try {
            $response = Http::withToken($config->access_token)->post($url, $payload);
            
            if ($response->successful()) {
                $responseData = $response->json();
                $wamId = $responseData['messages'][0]['id'] ?? null;

                // Log outbound message as Bot
                Message::create([
                    'org_id' => $config->org_id,
                    'contact_id' => $contact->id,
                    'wam_id' => $wamId,
                    'direction' => 'outbound',
                    'type' => $type,
                    'content' => $content,
                    'status' => 'sent',
                    'sender_type' => 'bot',
                    'created_at' => now(),
                ]);
            } else {
                Log::error("Failed to send reply material: " . $response->body());
            }
        } catch (\Exception $e) {
            Log::error("Exception in sendReplyMaterial: " . $e->getMessage());
        }
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
