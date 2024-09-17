<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('itineraries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reserve_id');
            $table->string('origin');
            $table->string('destination');
            $table->date('departure_date');
            $table->date('arrival_date');
            $table->timestamps();

            // Clave foránea hacia la tabla reserves
            $table->foreign('reserve_id')->references('id')->on('reserves')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('itineraries');
    }
};
