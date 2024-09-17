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
        Schema::table('itineraries', function (Blueprint $table) {
            $table->unsignedBigInteger('reserve_id'); // Crear la columna reserve_id
            
            // Definir la clave foránea si es necesario
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
    Schema::table('itineraries', function (Blueprint $table) {
        $table->dropForeign(['reserve_id']); // Eliminar la clave foránea
        $table->dropColumn('reserve_id'); // Eliminar la columna
    });
}
};
