<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categoria\StoreCategoriaRequest;
use App\Http\Resources\Categoria\CategoriaResource;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    protected Categoria $categoria;

    public function __construct(Categoria $categoria)
    {
        $this->categoria = $categoria;
    }
    public function getCategories()
    {
        return $this->categoria::with("productos")->get();
    }
    public function addCategory(StoreCategoriaRequest $request)
    {
        $newCategory = new Categoria($request->toArray());
        $newCategory->generateAttribute($request->nombre);
        $this->categoria::create($newCategory->toArray());
        return new CategoriaResource($newCategory);
    }
    public function deleteCategory($id_categoria)
    {
        $category = $this->categoria::where('id_categoria',$id_categoria)->with("productos")->get()->first();
        $category->productos()->detach();
        $result = $this->categoria::where("id_categoria",$id_categoria)->delete();
        if ($result) {
            return "Categoria borrada";
        } else {
            return "No se ha podido borrar la categoria";
        }
    }
    public function updateCategory($id_categoria,StoreCategoriaRequest $request)
    {
        $modCategory= new Categoria($request->toArray());
        $modCategory->generateSlug($request->nombre);
        $result = $this->categoria::where('id_categoria',$id_categoria)->update($modCategory->toArray());
        if ($result) {
            return "Categoria modificada";
        } else {
            return "No se ha podido modificar la categoria";
        }
    }
}
