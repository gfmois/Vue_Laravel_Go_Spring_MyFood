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
        Schema::create('h_reservas', function (Blueprint $table) {
            $table->id("id_reserva");
            $table->date("fecha");
            $table->string("tipo");
            $table->integer("n_comensales");
            $table->string("estado");
            $table->string("id_cliente");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('h_reservas');
    }
};
