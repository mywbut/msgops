<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class ReplyMaterial extends Model
{
    use HasUuids;

    protected $fillable = [
        'org_id',
        'name',
        'type',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }
}
