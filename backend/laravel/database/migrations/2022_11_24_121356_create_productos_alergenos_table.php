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
        Schema::create('productos_alergenos', function (Blueprint $table) {
            $table->string('id_producto');
            $table->string('id_alergeno');

            $table->primary(['id_producto','id_alergeno']);
        });

        Schema::table('productos_alergenos',function (Blueprint $table) {
            $table->foreign('id_producto')->references('id_producto')->on('productos')->onDelete('cascade');
            $table->foreign('id_alergeno')->references('id_alergeno')->on('alergenos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos_alergenos');
    }
};
