<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'org_id',
        'name',
        'template_name',
        'language',
        'status',
        'scheduled_at',
        'total_contacts',
        'sent_count',
        'delivered_count',
        'read_count',
        'replied_count',
        'failed_count',
        'variables_mapping'
    ];

    protected $casts = [
        'variables_mapping' => 'array',
    ];

    public function contacts()
    {
        return $this->hasMany(CampaignContact::class);
    }
}
