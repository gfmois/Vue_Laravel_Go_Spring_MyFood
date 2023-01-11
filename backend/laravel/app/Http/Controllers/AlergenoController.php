<?php

namespace App\Http\Controllers;

use App\Http\Requests\Alergeno\StoreAlergenoRequest;
use App\Http\Requests\UpdateAlergenoRequest;
use App\Http\Resources\Alergeno\AlergenoResource;
use App\Models\Alergeno;

class AlergenoController extends Controller
{
    protected Alergeno $alergeno;

    public function __construct(Alergeno $alergeno)
    {
        $this->alergeno = $alergeno;
    }
    public function getAllergens()
    {
        return $this->alergeno::with("productos")->get();
    }
    public function addAllergen(StoreAlergenoRequest $request)
    {
        $newAllergen = new Alergeno($request->toArray());
        $newAllergen->generateAttribute($request->nombre);
        $this->alergeno::create($newAllergen->toArray());
        return new AlergenoResource($newAllergen);
    }
    public function deleteAllergen($id_alergeno)
    {
        $allergen = $this->alergeno::where('id_alergeno',$id_alergeno)->with("productos")->get()->first();
        $allergen->productos()->detach();
        $result = $this->alergeno::where("id_alergeno",$id_alergeno)->delete();
        if ($result) {
            return "Alergeno borrado";
        } else {
            return "No se ha podido borrar el alergeno";
        }
    }
    public function updateAllergen($id_alergeno,StoreAlergenoRequest $request)
    {
        $modAllergen = new Alergeno($request->toArray());
        $result = $this->alergeno::where("id_alergeno",$id_alergeno)->update($modAllergen->toArray());
        if ($result) {
            return "Alergeno modificado";
        } else {
            return "No se ha podido modificar el alergeno";
        }
    }
    
}
