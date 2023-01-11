<?php

namespace App\Http\Resources\Alergeno;

use Illuminate\Http\Resources\Json\JsonResource;

class AlergenoResource extends JsonResource
{
    public static $wrap = '';
    public function toArray($request)
    {
        return [
            'nombre' => $this->nombre,
            'imagen' => $this->imagen
        ];
    }
}
