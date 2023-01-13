<?php

namespace App\Http\Resources\Producto;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductoCollection extends ResourceCollection
{
    public static $wrap = '';   
    public function toArray($request)
    {
        return [
            'productos' => $this->collection,
            'n_productos' => $this->count(),
            'n_categorias' => 4,
            'n_alergenos' => 4
        ];
    }
}
