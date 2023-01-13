<?php

namespace App\Http\Resources\Categoria;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoriaCollection extends ResourceCollection
{
    public static $wrap = '';
    public function toArray($request)
    {
        return [
            'categorias' => $this->collection,
            'n_categorias' => $this->count()
        ];
    }
}
