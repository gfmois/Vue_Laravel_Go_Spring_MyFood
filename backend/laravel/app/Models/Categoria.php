<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Categoria extends Model
{
    use HasFactory;
    protected $table = "categorias";

    public $timestamps = false;

    protected $fillable = [
        'id_categoria',
        'slug',
        'nombre',
        'icono'
    ];

    public function productos()
    {
        return $this->belongsToMany(Producto::class,"categorias_productos","id_categoria","id_producto","id_categoria","id_producto");
    }

    public function generateAttribute(string $name)
    {
        $this->attributes['id_categoria'] = Str::uuid()->toString();
        $this->attributes['slug'] = Str::slug($name);
    }

    public function generateSlug(string $name)
    {
        $this->attributes['slug'] = Str::slug($name);
    }
}
