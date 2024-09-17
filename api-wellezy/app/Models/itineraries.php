<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class itineraries extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'reserve_id',
        'origin',
        'destination',
        'departure_date',
        'arrival_date',
    ];

    // Define la relación con el modelo Reserve
    public function reserve()
    {
        return $this->belongsTo(reserves::class);
    }
}
