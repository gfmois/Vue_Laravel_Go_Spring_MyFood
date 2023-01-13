<?php

namespace App\Http\Requests\Cliente;

use Illuminate\Foundation\Http\FormRequest;

class StoreClienteRequest extends FormRequest {
    public function authorize() { return true; }

    public function rules() {
        return [
            "nombre" => ["required"],
            "id_cliente" => ["required"],
            "email" => ["required"],
            "telefono" => ["required"],
            "contraseña" => ["required"],
            "avatar" => ["required"]
        ];
    }
}
