<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class WhatsappConfig extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'org_id',
        'phone_number_id',
        'waba_id',
        'access_token',
        'webhook_verify_token',
        'business_name',
        'business_id',
        'waba_name',
        'phone_number',
        'phone_status',
        'is_subscribed',
        'is_automation_enabled',
        'automation_keywords',
        'automation_reply',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }
}
