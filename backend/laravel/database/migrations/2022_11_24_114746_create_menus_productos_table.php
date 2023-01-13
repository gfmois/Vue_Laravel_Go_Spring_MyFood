$table->string("id_menu");<?php

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
        Schema::create('menus_productos', function (Blueprint $table) {
            $table->string("id_menu");
            $table->string("id_producto");

            $table->primary(["id_menu", "id_producto"]);
        });

        Schema::table("menus_productos", function(Blueprint $table) {
            $table->foreign("id_menu")->references("id_menu")->on("menus")->onDelete("cascade");
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
        Schema::dropIfExists('menus_productos');
    }
};
