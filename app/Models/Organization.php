<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'plan_tier',
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
}
