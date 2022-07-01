<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    use HasFactory;

    public function events()
    {
        return $this->belongsToMany(Event::class, 'alumni_event', 'alumni_id', 'event_id');
    }
}
