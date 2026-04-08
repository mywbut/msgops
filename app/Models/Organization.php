<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'plan_tier',
        'wallet_balance',
        'currency',
        'free_service_conversations',
        'monthly_automation_triggers',
        'automation_triggers_last_reset',
        'last_limit_warning_at',
    ];

    /**
     * Get the automation trigger limit for the current plan.
     */
    public function getAutomationLimitAttribute(): int
    {
        return match ($this->plan_tier) {
            'free' => 100,
            'growth' => 500,
            'pro' => 1000,
            default => 100,
        };
    }

    /**
     * Check if automation can be executed (free limit or enough balance).
     */
    public function canExecuteAutomation(): bool
    {
        $this->maybeResetMonthlyTriggers();

        if ($this->monthly_automation_triggers < $this->automation_limit) {
            return true;
        }

        // Over limit - Check if balance can cover the ₹0.05 fee
        return $this->wallet_balance >= 0.05;
    }

    /**
     * Reset the trigger count if the month has changed.
     */
    private function maybeResetMonthlyTriggers(): void
    {
        $now = now();
        $lastReset = $this->automation_triggers_last_reset;

        if (!$lastReset || $now->month !== $lastReset->month || $now->year !== $lastReset->year) {
            $this->monthly_automation_triggers = 0;
            $this->automation_triggers_last_reset = $now;
            $this->last_limit_warning_at = null;
            $this->save();
        }
    }

    /**
     * Increment the automation trigger count and charge if over limit.
     */
    public function incrementAutomationTriggers(): bool
    {
        $this->maybeResetMonthlyTriggers();

        $this->increment('monthly_automation_triggers');
        $newCount = $this->monthly_automation_triggers;
        $limit = $this->automation_limit;

        // Charge if over limit
        if ($newCount > $limit) {
            $this->withdraw(0.05, 'automation', 'Automation trigger fee over monthly free limit of ' . $limit);
        }

        // Check for 90% threshold warning
        if ($newCount >= ($limit * 0.9) && $newCount <= $limit && !$this->last_limit_warning_at) {
            $this->last_limit_warning_at = now();
            $this->save();
            // TODO: In a real system, we might push a notification event here.
        }

        return true;
    }

    protected $casts = [
        'automation_triggers_last_reset' => 'datetime',
        'last_limit_warning_at' => 'datetime',
    ];

    public function whatsappConfig()
    {
        return $this->hasOne(WhatsappConfig::class, 'org_id');
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class, 'org_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'org_id');
    }

    public function creditTransactions()
    {
        return $this->hasMany(CreditTransaction::class);
    }

    public function deposit($amount, $description = null, $metadata = [])
    {
        $this->increment('wallet_balance', $amount);
        
        return $this->creditTransactions()->create([
            'amount' => $amount,
            'type' => 'topup',
            'description' => $description ?? 'Credit Top-up',
            'metadata' => $metadata,
        ]);
    }

    public function withdraw($amount, $category = null, $description = null)
    {
        if ($this->wallet_balance < $amount) {
            return false;
        }

        $this->decrement('wallet_balance', $amount);

        return $this->creditTransactions()->create([
            'amount' => -$amount,
            'type' => 'deduction',
            'category' => $category,
            'description' => $description ?? 'Conversation Fee',
        ]);
    }
}
