<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Producto extends Model
{
    use HasFactory;

    protected $table = "productos";

    public $timestamps = false;

    protected $fillable = [
        'id_producto',
        'slug',
        'nombre',
        'precio',
        'icono'
    ];

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, "categorias_productos", "id_producto","id_categoria","id_producto","id_categoria");
    }

    public function alergenos()
    {
        return $this->belongsToMany(Alergeno::class, "productos_alergenos","id_producto","id_alergeno","id_producto","id_alergeno");
    }

    public function generateAttribute(string $name)
    {
        $this->attributes['id_producto'] = Str::uuid()->toString();
        $this->attributes['slug'] = Str::slug($name);
    }
    public function generateSlug(string $name)
    {
        $this->attributes['slug'] = Str::slug($name);
    }




}
