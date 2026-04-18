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

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($contact) {
            if (!$contact->last_message_at) {
                $contact->last_message_at = now();
            }
        });
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class, 'org_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'contact_id');
    }
}
