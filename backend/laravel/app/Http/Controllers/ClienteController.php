<?php

namespace App\Http\Controllers;

use App\Models\Cliente;

class ClienteController extends Controller {
    protected Cliente $cliente;

    public function __construct(Cliente $cliente) {
        $this->cliente = $cliente;
    }

    public function getClientes() {
        return $this->cliente->all();
    }
}
