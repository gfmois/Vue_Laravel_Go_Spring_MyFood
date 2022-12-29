<?php

namespace App\Http\Controllers;

use App\Http\Requests\Producto\StoreProductoRequest;
use App\Models\Producto;
use Illuminate\Support\Arr;

class ProductoController extends Controller
{
    protected Producto $producto;

    public function __construct(Producto $producto)
    {
        $this->producto = $producto;
    }

    public function getProducts()
    {
        $allProducts = $this->producto::with("categorias","alergenos")->get();
        foreach ($allProducts as $key => $value) {
            $c_categories = [];
            foreach ($value->categorias as $key2 => $value2) {
                $c_categories[$key2]=$value2->nombre;
            }
            $allProducts[$key]->c_categorias = $c_categories;
        }


        return $allProducts;
    }

    public function addProduct(StoreProductoRequest $request)
    {
        $newProduct = new Producto($request->toArray());
        $newProduct->generateAttribute($request->nombre);
        $file_name = $newProduct->slug.'_'.$request->upload_image->getClientOriginalName();
        $request->upload_image->move("uploads",$file_name);
        $newProduct->imagen = $file_name;
        $this->producto::create($newProduct->toArray());
        $newProduct->categorias()->attach(explode(',',$request->categorias));
        $newProduct->alergenos()->attach(explode(',',$request->alergenos));
        return $this->producto::where("id_producto",$newProduct->id_producto)->with("categorias","alergenos")->get()->first();

    }
    public function deleteProduct($id_producto)
    {
        $product = $this->producto::where("id_producto",$id_producto)->get()->first();
        $product->categorias()->detach();
        $product->alergenos()->detach();
        $result = $this->producto::where("id_producto",$id_producto)->delete();
        if ($result) {
            return "Producto borrado";
        } else {
            return "No se ha podido borrar el producto";
        }

    }
    public function updateProduct($id_producto, StoreProductoRequest $request)
    {
        $oldProduct = $this->producto::where('id_producto',$id_producto)->with("categorias","alergenos")->get()->first();
        $result1 = count(Arr::flatten($oldProduct->categorias()->sync($request->categorias)));
        $result2 = count(Arr::flatten($oldProduct->alergenos()->sync($request->alergenos)));
        $modProduct = new Producto($request->toArray());
        $modProduct->generateSlug($request->nombre);
        $result = $this->producto::where('id_producto',$id_producto)->update($modProduct->toArray());
        if ($result || $result1 || $result2) {
            return "Producto modificado";
        } else {
            return "No se ha modificado el producto";
        }
    }
}
