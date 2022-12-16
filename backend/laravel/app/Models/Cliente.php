<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model {
    use HasFactory;
    protected $table = "clientes";

    public $timestamps = false;
    protected $fillable = [
        "id_cliente",
        "nombre",
        "email",
        "telefono",
        "contraseña",
        "avatar",
        "created_at",
        "updated_at"
    ];
}
