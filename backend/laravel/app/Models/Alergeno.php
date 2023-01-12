<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

class Alergeno extends Model
{
    use HasFactory;

    protected $table = "alergenos";

    public $timestamps = false;

    protected $fillable = [
        'id_alergeno',
        'nombre',
        'icono'
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class, "productos_alergenos", "id_alergeno", "id_producto", "id_alergeno", "id_producto");
    }
    public function generateAttribute($name)
    {
        if ($name) {
            $this->attributes["id_alergeno"] = $name;
        } else {
            $uuid = "";
            foreach (explode("-", Uuid::uuid1()) as $item) {
                $uuid .= $item;
                $this->attributes["id_alergeno"] = substr($uuid, 0, 10);
            }
        }

    }
}
