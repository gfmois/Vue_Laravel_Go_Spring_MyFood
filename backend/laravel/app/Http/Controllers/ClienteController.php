<?php

namespace App\Http\Controllers;

use App\Models\Cliente;

class ClienteController extends Controller
{
    public function getClientes() {
        return Cliente::all();
    }
}
