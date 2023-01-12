<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cliente\StoreClientDeleteRequest;
use App\Http\Requests\Cliente\StoreClienteRequest;
use App\Http\Requests\Cliente\StoreClientRequest;
use App\Http\Resources\Cliente\ClientResource;
use App\Models\Cliente;
use Illuminate\Support\Facades\DB;

class ClienteController extends Controller
{

    protected Cliente $cliente;

    public function __construct(Cliente $cliente) {
        $this->cliente = $cliente;
    }

    public function getClientes() {
        return Cliente::all();
    }

    public function addClient(StoreClienteRequest $request) {
        $newClient = new Cliente($request->toArray());
        if ($this->cliente::create($newClient->toArray()) != null) {
            return new ClientResource($newClient);
        }

        return false;
    }

    public function deleteClient(StoreClientDeleteRequest $request) {
        $result = $this->cliente::where("id_cliente", $request->id_cliente)->delete();
        if ($result) {
            return [
                "status" => "success",
                "msg" => "Cliente borrado"
            ];
        }

        return [
            "status" => "error",
            "msg" => "No se ha podido borrar el cliente"
        ];
    }

    public function updateClient(StoreClienteRequest $request) {
        $modClient = new Cliente($request->toArray());
        $result = $this->cliente::where("id_cliente", $request->id_cliente)->update($modClient->toArray());

        if ($result) {
            return [
                "msg" => "Cliente Modificado",
                "status" => "success"
            ];
        }

        return [
            "msg" => "No se ha podido modificar el cliente",
            "status" => "error"
        ];
    }

    public function getClientProperties() {
        return DB::select(DB::raw("SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'clientes'"));
    }
}
