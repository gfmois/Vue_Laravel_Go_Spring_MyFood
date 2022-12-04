<?php

namespace App\Http\Requests\Producto;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "nombre" => ["required"],
            "precio" => ["required"],
            "imagen" => ["required"]
        ];
    }
}
