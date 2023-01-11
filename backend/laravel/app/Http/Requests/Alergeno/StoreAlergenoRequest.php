<?php

namespace App\Http\Requests\Alergeno;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlergenoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            "nombre" => ["required"],
            "imagen" => ["required"]
        ];
    }
}
