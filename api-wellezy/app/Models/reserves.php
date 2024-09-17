<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserves extends Model
{
    use HasFactory;

    // Define la tabla
    protected $table = 'reserves';

    protected $fillable = [
        'id_user',
        'locationName',
        'dateOfDeparture',
        'timeOfDeparture',
    ];

    // Define la relación con el modelo Itinerary
    public function itineraries()
    {
        return $this->hasMany(Itinerary::class, 'reserve_id');
    }
}
