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
