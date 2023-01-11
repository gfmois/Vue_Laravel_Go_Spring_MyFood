<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Alergeno extends Model
{
    use HasFactory;
    
    protected $table = "alergenos";

    public $timestamps = false;

    protected $fillable = [
        'id_alergeno',
        'nombre',
        'imagen'
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class,"productos_alergenos","id_alergeno","id_producto","id_alergeno","id_producto");
    }
    public function generateAttribute(string $name)
    {
        $this->attributes['id_alergeno'] = Str::uuid()->toString();
    }
}
