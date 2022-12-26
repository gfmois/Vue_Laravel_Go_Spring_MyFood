<?php

namespace App\Http\Controllers;

use App\Http\Requests\Reserva\StoreReservaRequest;
use App\Models\Reserva;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class ReservaController extends Controller {
    protected Reserva $reserva;

    public function __construct(Reserva $reserva) {
        $this->reserva = $reserva;
    }

    public function getReserves() {
        return $this->reserva->all();
    }

    public function getReserva($id_reserva) {
        return $this->reserva
            ->with("client")
            ->where("id_reserva", $id_reserva)
            ->get()[0];
    }

    public function createReserva(StoreReservaRequest $request) {
        $t_reserva = new Reserva($request->toArray());
        $uuid = "";
        foreach(explode("-", Uuid::uuid1()) as $item) {
            $uuid .= $item;
        }

        $t_reserva->id_reserva = substr($uuid, 0, 10);

        if ($this->reserva::create($t_reserva->toArray())) {
            return $t_reserva;
        }

        return false;
    }

    public function updateReserva(Request $request) {
        return $this->reserva
            ->where("id_reserva", $request->id_reserva)
            ->update($request->toArray());
    }
}
