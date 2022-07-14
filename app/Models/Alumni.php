<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    use HasFactory;

    public function events()
    {
        return $this->belongsToMany(Event::class)->withPivot(['attended', 'attended_timestamp', 'number_of_members']);
    }
}
