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
        Schema::create('categorias_productos', function (Blueprint $table) {
            $table->string('id_categoria');
            $table->string('id_producto');
            
            $table->primary(['id_categoria','id_producto']);
        });
        Schema::table('categorias_productos',function(Blueprint $table){
            $table->foreign("id_categoria")->references("id_categoria")->on("categorias")->onDelete("cascade");
            $table->foreign("id_producto")->references("id_producto")->on("productos")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categorias_productos');
    }
};
