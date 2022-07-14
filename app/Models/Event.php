<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public function alumnis()
    {
        return $this->belongsToMany(Alumni::class)->withPivot(['attended', 'attended_timestamp', 'number_of_members']);
    }
}
