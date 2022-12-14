<?php

namespace App\Http\Resources\Producto;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    public static $wrap = '';

    public function toArray($request)
    {
        return [
            'nombre' => $this->nombre,
            'precio' => $this->precio,
            'imagen' => $this->imagen

        ];
        
    }
}
