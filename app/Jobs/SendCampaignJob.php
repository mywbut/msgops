<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendCampaignJob implements ShouldQueue
{
    use Queueable;

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
                $response = \Illuminate\Support\Facades\Http::withToken($config->access_token)
                    ->post("https://graph.facebook.com/v18.0/{$config->phone_number_id}/messages", [
                        'messaging_product' => 'whatsapp',
                        'recipient_type' => 'individual',
                        'to' => $campaignContact->contact->phone,
                        'type' => 'template',
                        'template' => [
                            'name' => $campaign->template_name,
                            'language' => [
                                'code' => $campaign->language,
                            ]
                        ]
                    ]);

                if ($response->successful()) {
                    $campaignContact->update([
                        'status' => 'SENT',
                        'message_id' => $response->json()['messages'][0]['id'] ?? null,
                    ]);
                    $campaign->increment('sent_count');
                } else {
                    $campaignContact->update([
                        'status' => 'FAILED',
                        'error' => $response->body(),
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
