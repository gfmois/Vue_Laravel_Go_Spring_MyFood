<?php

namespace App\Http\Requests\Cliente;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientDeleteRequest extends FormRequest {
    public function authorize() { return true; }

    public function rules() {
        return [
            "id_cliente" => ["required"]
        ];
    }
}
