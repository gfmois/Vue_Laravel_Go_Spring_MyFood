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
        Schema::create('mesas', function (Blueprint $table) {
            $table->string("id_mesa");
            $table->string("id_cliente");
            $table->date("fecha");
            $table->string("tipo");
            $table->integer("n_comensales");
            $table->string("estado");

            $table->primary(["id_mesa", "id_cliente"]);
        });

        Schema::table('mesas', function(Blueprint $table) {
            $table->foreign("id_cliente")->references("id_cliente")->on("clientes")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mesas', function(Blueprint $table) {
            $table->dropForeign('mesas_id_cliente_foreign');
            $table->dropIndex('mesas_id_cliente_index');
            $table->dropColumn('id_cliente');
        });
    }
};
