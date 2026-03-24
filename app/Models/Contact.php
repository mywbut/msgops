<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasUuids;

    public $timestamps = true;

    protected $fillable = [
        'org_id',
        'phone_number',
        'name',
        'tags',
        'last_message_at',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'contact_id');
    }
}
