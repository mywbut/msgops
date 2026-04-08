<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class AutomationRule extends Model
{
    use HasUuids;

    protected $fillable = [
        'org_id',
        'name',
        'trigger_type',
        'trigger_config',
        'action_config',
        'is_active',
        'executed_count',
        'last_executed_at',
    ];

    protected $casts = [
        'trigger_config' => 'array',
        'action_config' => 'array',
        'is_active' => 'boolean',
        'last_executed_at' => 'datetime',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }
}
