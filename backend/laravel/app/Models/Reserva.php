<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model {
    use HasFactory;
    protected $table = "reservas";

    public $timestamps = false;
    protected $fillable = [
        "id_reserva",
        "id_cliente",
        "fecha",
        "tipo",
        "n_comensales",
        "estado"
    ];

    public function client() {
        return $this->belongsTo(Cliente::class ,'id_cliente', 'id_cliente');
    }
}
