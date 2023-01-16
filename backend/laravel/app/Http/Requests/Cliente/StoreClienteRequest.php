<?php

namespace App\Http\Requests\Cliente;

use Illuminate\Foundation\Http\FormRequest;

class StoreClienteRequest extends FormRequest {
    public function authorize() { return true; }

    public function rules() {
        return [
            "contraseña" => ["required"],
            "nombre" => ["required"],
            "id_cliente" => ["required"],
            "email" => ["required"],
            "telefono" => ["required"],
            "avatar" => ["required"]
        ];
    }
}
