<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model {
    use HasFactory;

    protected $table = "pedidos";
    public $timestamps = false;
    protected $fillable = [
        "id_pedido",
        "id_cliente",
        "fecha",
        "estado"
    ];
}
