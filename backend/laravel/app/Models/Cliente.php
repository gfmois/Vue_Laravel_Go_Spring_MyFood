<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Ramsey\Uuid\Uuid;

class Cliente extends Authenticatable implements JWTSubject {
    use HasFactory, Notifiable;
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

    protected $hidden = [
        "constraseña",
        "remember_token"
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function reserves() {
        return $this->hasMany(Reserva::class, "id_cliente", "id_cliente");
    }
}