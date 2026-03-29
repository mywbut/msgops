<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable as BusQueueable;

class SendCampaignJob implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, Queueable;

    protected $campaign;

    /**
     * Create a new job instance.
     */
    public function __construct($campaign)
    {
        $this->campaign = $campaign;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $campaign = $this->campaign;
        $config = \App\Models\WhatsappConfig::where('org_id', $campaign->org_id)->first();

        if (!$config || !$config->access_token || !$config->phone_number_id) {
            $campaign->update(['status' => 'FAILED']);
            return;
        }

        $pendingContacts = \App\Models\CampaignContact::where('campaign_id', $campaign->id)
            ->where('status', 'PENDING')
            ->with('contact')
            ->get();

        foreach ($pendingContacts as $campaignContact) {
            try {
                $components = [];
                $rawMapping = (array)($campaign->variables_mapping ?? []);
                if (!empty($rawMapping)) {
                    $parameters = [];
                    // Extract numerical keys and sort them 1, 2, 3...
                    $sortedIndices = array_keys($rawMapping);
                    sort($sortedIndices, SORT_NUMERIC);

                    foreach ($sortedIndices as $index) {
                        $mapping = $rawMapping[$index] ?? null;
                        if (!$mapping) continue;

                        $textVal = 'Customer';
                        if (($mapping['type'] ?? '') === 'contact') {
                            $field = $mapping['value'] ?? 'name';
                            $textVal = $campaignContact->contact->{$field} ?? 'Customer';
                        } else {
                            $textVal = $mapping['value'] ?? 'Customer';
                        }

                        if (empty(trim((string)$textVal))) {
                            $textVal = 'Customer';
                        }

                        $parameters[] = [
                            'type' => 'text',
                            'text' => (string)$textVal
                        ];
                    }

                    if (!empty($parameters)) {
                        $components[] = [
                            'type' => 'body',
                            'parameters' => $parameters
                        ];
                    }
                }

                $payload = [
                    'messaging_product' => 'whatsapp',
                    'recipient_type' => 'individual',
                    'to' => $campaignContact->contact->phone_number,
                    'type' => 'template',
                    'template' => [
                        'name' => $campaign->template_name,
                        'language' => [
                            'code' => $campaign->language,
                        ]
                    ]
                ];

                if (!empty($components)) {
                    $payload['template']['components'] = $components;
                } else {
                    if (!empty($rawMapping)) {
                        \Illuminate\Support\Facades\Log::warning("Mapping exists but components empty for campaign {$campaign->id}");
                    }
                }

                \Illuminate\Support\Facades\Log::info("Launching WhatsApp Campaign Message", [
                    'campaign_id' => $campaign->id,
                    'contact_id' => $campaignContact->contact_id,
                    'timestamp' => now()->toDateTimeString(),
                    'payload' => $payload
                ]);

                $response = \Illuminate\Support\Facades\Http::withToken($config->access_token)
                    ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages", $payload);

                // Reconstruct full message structure for display in Inbox
                $renderedContent = [
                    'body' => "Sent template: {$campaign->template_name}",
                    'header' => null,
                    'footer' => null,
                    'buttons' => []
                ];

                try {
                    // Try to fetch template structure to reconstruct the text
                    $templateResponse = \Illuminate\Support\Facades\Http::withToken($config->access_token)
                        ->get("https://graph.facebook.com/v18.0/{$config->waba_id}/message_templates?name={$campaign->template_name}");
                    
                    if ($templateResponse->successful()) {
                        $templateData = $templateResponse->json()['data'][0] ?? null;
                        if ($templateData) {
                            foreach ($templateData['components'] as $comp) {
                                if ($comp['type'] === 'HEADER' && $comp['format'] === 'TEXT') {
                                    $renderedContent['header'] = $comp['text'];
                                } elseif ($comp['type'] === 'BODY') {
                                    $renderedContent['body'] = $comp['text'];
                                    // Replace variables {{1}}, {{2}}... with parameter values
                                    if (!empty($parameters)) {
                                        foreach ($parameters as $index => $param) {
                                            $pNum = $index + 1;
                                            $renderedContent['body'] = str_replace("{{{$pNum}}}", $param['text'], $renderedContent['body']);
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
                    \Illuminate\Support\Facades\Log::warning("Failed to render template structure for campaign logging: " . $e->getMessage());
                }

                if ($response->successful()) {
                    $responseData = $response->json();
                    $wamId = $responseData['messages'][0]['id'] ?? null;

                    $campaignContact->update([
                        'status' => 'SENT',
                        'message_id' => $wamId,
                    ]);

                    // Log to Messages table with FULL structure
                    \App\Models\Message::create([
                        'org_id' => $campaign->org_id,
                        'contact_id' => $campaignContact->contact_id,
                        'wam_id' => $wamId,
                        'direction' => 'outbound',
                        'type' => 'template',
                        'content' => array_merge($renderedContent, [
                            'template' => $campaign->template_name,
                            'language' => $campaign->language,
                        ]),
                        'status' => 'sent',
                    ]);

                    $campaignContact->contact->update(['last_message_at' => now()]);
                    $campaign->increment('sent_count');
                } else {
                    $errorData = $response->json();
                    $errorMsg = $errorData['error']['message'] ?? 'Unknown API error';

                    $campaignContact->update([
                        'status' => 'FAILED',
                        'error' => $response->body(),
                    ]);

                    // Log failed message to Messages table
                    \App\Models\Message::create([
                        'org_id' => $campaign->org_id,
                        'contact_id' => $campaignContact->contact_id,
                        'direction' => 'outbound',
                        'type' => 'template',
                        'content' => array_merge($renderedContent, [
                            'template' => $campaign->template_name,
                        ]),
                        'status' => 'failed',
                        'error' => $errorData['error'] ?? ['message' => $errorMsg],
                    ]);

                    $campaign->increment('failed_count');
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("Campaign {$campaign->id} Send Error: " . $e->getMessage());
                $campaignContact->update([
                    'status' => 'FAILED',
                    'error' => $e->getMessage(),
                ]);
                $campaign->increment('failed_count');
            }
        }

        $campaign->update(['status' => 'COMPLETED']);
    }
}
