<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;

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

    public function generateAttribute(string $name, $id_cat)
    {
        if ($id_cat) {
            $this->attributes["id_categoria"] = $id_cat;
        } else {
            $uuid = "";
            foreach (explode("-", Uuid::uuid1()) as $item) {
                $uuid .= $item;
                $this->attributes["id_categoria"] = substr($uuid, 0, 10);
            }
        }

        $this->attributes['slug'] = Str::slug($name);
    }

    public function generateSlug(string $name)
    {
        $this->attributes['slug'] = Str::slug($name);
    }
}
