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
        Schema::create('eventos', function (Blueprint $table) {
            $table->string("id_evento");
            $table->string("id_cliente");
            $table->string("nombre");
            $table->integer("n_comensales");
            $table->date("fecha");
            $table->string("tipo");
            $table->string("estado");
            $table->timestamps();

            $table->primary(["id_evento", "id_cliente"]);
        });

        Schema::table("eventos", function(Blueprint $table) {
            $table->index("id_cliente");
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
        Schema::dropIfExists('eventos', function(Blueprint $table) {
            $table->dropForeign('eventos_id_cliente_foreign');
            $table->dropIndex('eventos_id_cliente_index');
            $table->dropColumn('id_cliente');
        });


    }
};
