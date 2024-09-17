<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    use HasFactory;

    protected $table = 'itineraries';

    protected $fillable = [
        'reserve_id', // Clave foránea que conecta con la tabla reserves
        'origin',
        'destination',
        'departure_date',
        'arrival_date',
    ];

    // Define la relación inversa con el modelo Reserve
    public function reserve()
    {
        return $this->belongsTo(Reserves::class);
    }
}
