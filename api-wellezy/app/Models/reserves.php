<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reserves extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'locationName',
        'dateOfDeparture',
        'timeOfDeparture',
    ];

    // Define la relación con el modelo Itinerary
    public function itineraries()
    {
        return $this->hasMany(itineraries::class);
    }
}
