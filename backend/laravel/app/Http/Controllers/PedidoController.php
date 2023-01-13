<?php

namespace App\Http\Controllers;

use App\Models\Pedido;

class PedidoController extends Controller {
    protected Pedido $pedido;

    public function __construct(Pedido $pedido) {
        $this->pedido = $pedido;
    }

    public function getPedidos() {
        $orders = $this->pedido->all();
        return $orders;
    }
}
