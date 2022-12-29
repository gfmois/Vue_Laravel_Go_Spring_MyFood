<?php
namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class StoreAuthRegisterRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            "nombre" => ["required"],
            "email" => ["required"],
            "contraseña" => ["required"],
            "telefono" => ["required"]
        ];
    }
}
