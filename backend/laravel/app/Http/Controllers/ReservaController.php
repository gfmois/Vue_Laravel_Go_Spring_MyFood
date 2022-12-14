<?php

namespace App\Http\Controllers;

use App\Models\Reserva;

class ReservaController extends Controller {
    protected Reserva $reserva;

    public function __construct(Reserva $reserva) {
        $this->reserva = $reserva;
    }

    public function getReserves() {
        return $this->reserva->all();
    }

    public function getReserva($id_reserva) {
        return $this->reserva::where("id_reserva", $id_reserva)->get();
    }
}
