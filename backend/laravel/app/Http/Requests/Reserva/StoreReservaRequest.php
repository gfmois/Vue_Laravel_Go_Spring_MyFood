<?php

namespace App\Http\Requests\Reserva;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservaRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            "id_cliente" => ["required"],
            "fecha" => ["required"],
            "estado" => ["required"],
            "n_comensales" => ["required"],
            "tipo" => ["required"]
        ];
    }
}
