<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUuids;

    public $timestamps = true;
    const UPDATED_AT = null;

    protected $fillable = [
        'org_id',
        'contact_id',
        'wam_id',
        'direction',
        'type',
        'content',
        'status',
        'sender_type',
        'error',
        'is_read',
    ];

    protected $casts = [
        'content' => 'array',
        'error' => 'array',
        'is_read' => 'boolean',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }
}
