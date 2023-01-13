<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable implements JWTSubject {
    use HasFactory, Notifiable;

    protected $table = "usuarios";
    protected $primaryKey = 'id_usuario';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        "id_usuario",
        "nombre",
        "email",
        "cargo",
        "contraseña",
        "avatar"
    ];

    protected $hidden = [
        "contraseña",
        "remember_token",
        // "id_usuario" ?
    ];

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function getAuthPassword() {
        return $this->contraseña;
    }
}
