<?php

namespace App\Http\Resources\Categoria;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoriaResource extends JsonResource
{
    public static $wrap = '';

    public function toArray($request)
    {
        return [
            'nombre' => $this->nombre,
            'icono' => $this->icono
        ];
    }
}
