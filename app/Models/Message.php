<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'org_id',
        'contact_id',
        'wam_id',
        'direction',
        'type',
        'content',
        'status',
        'error',
    ];

    protected $casts = [
        'content' => 'array',
        'error' => 'array',
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
