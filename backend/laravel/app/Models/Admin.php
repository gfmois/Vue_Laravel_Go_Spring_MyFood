<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable implements JWTSubject {
    use HasFactory, Notifiable;

    protected $table = "usuarios";

    public $timestamps = false;
    protected $fillable = [
        "id_usuario",
        "usuario",
        "email",
        "cargo",
        "contraseña",
        "avatar"
    ];

    protected $hidden = [
        "contaseña",
        "remember_token"
    ];

    protected $primaryKey = 'id_usuario';

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
