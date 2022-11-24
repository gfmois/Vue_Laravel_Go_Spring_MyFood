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
        Schema::create('menus_eventos', function (Blueprint $table) {
            $table->string("id_menu");
            $table->string("id_evento");
            $table->integer("n_platos");

            $table->primary(["id_menu", "id_evento"]);
        });

        Schema::table("menus_eventos", function(Blueprint $table) {
            $table->foreign("id_menu")->references("id_menu")->on("menus")->onDelete("cascade");
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
        Schema::dropIfExists('menus_eventos');
    }
};
