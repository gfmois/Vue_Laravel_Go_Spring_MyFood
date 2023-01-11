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
        Schema::create('menus_personalizados', function (Blueprint $table) {
            $table->string("id_menu_personalizado");
            $table->string("id_evento");
            $table->string("nombre");

            $table->primary(["id_menu_personalizado", "id_evento"]);
        });

        Schema::table("menus_personalizados", function(Blueprint $table) {
            $table->foreign("id_menu_personalizado")->references("id_menu")->on("menus_productos")->onDelete("cascade");
            $table->foreign("id_evento")->references("id_evento")->on("eventos")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus_personalizados');
    }
};
