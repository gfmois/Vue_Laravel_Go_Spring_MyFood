<?php

namespace App\Http\Controllers;

use App\Http\Requests\Producto\StoreProductoRequest;
use App\Models\Producto;
use Illuminate\Http\Request;
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
        $allProducts = $this->producto::with("categorias", "alergenos")->get();
        foreach ($allProducts as $key => $value) {
            $c_categories = [];
            foreach ($value->categorias as $key2 => $value2) {
                $c_categories[$key2] = $value2->nombre;
            }
            $allProducts[$key]->c_categorias = $c_categories;
        }
        return $allProducts;
    }
    public function getProduct($id_producto)
    {
        return $this->producto::where("id_producto", $id_producto)->with("categorias", "alergenos")->get()->first();
    }
    public function addProduct(Request $request)
    {
        $newProduct = new Producto($request->toArray());
        $newProduct->generateAttribute($request->nombre);
        if ($request->upload_image) {
            $file_name = $newProduct->slug . '_' . $request->upload_image->getClientOriginalName();
            $request->upload_image->move("uploads", $file_name);
            $newProduct->imagen = $file_name;
        } else {
            $newProduct->imagen = "imagen";
        }
        $this->producto::create($newProduct->toArray());
        if ($request->categorias) {
            $newProduct->categorias()->attach(explode(',', $request->categorias));
        }
        if ($request->alergenos) {
            $newProduct->alergenos()->attach(explode(',', $request->alergenos));
        }
        return $this->producto::where("id_producto", $newProduct->id_producto)->with("categorias", "alergenos")->get()->first();
    }
    public function deleteProduct($id_producto)
    {
        $product = $this->producto::where("id_producto", $id_producto)->get()->first();
        $product->categorias()->detach();
        $product->alergenos()->detach();
        $result = $this->producto::where("id_producto", $id_producto)->delete();
        if ($result) {
            return "Producto borrado";
        } else {
            return "No se ha podido borrar el producto";
        }
    }
    public function updateProduct($id_producto, Request $request)
    {
        $oldProduct = $this->producto::where('id_producto', $id_producto)->with("categorias", "alergenos")->get()->first();
        if ($request->categorias) {
            $result1 = count(Arr::flatten($oldProduct->categorias()->sync(explode(',', $request->categorias))));
        }
        if ($request->alergenos) {
            $result2 = count(Arr::flatten($oldProduct->alergenos()->sync(explode(',', $request->alergenos))));
        }
        $modProduct = new Producto($request->toArray());
        $modProduct->generateSlug($request->nombre);
        try {
            if ($request->upload_image) {
                $file_name = $oldProduct->slug . '_' . $request->upload_image->getClientOriginalName();
                $request->upload_image->move("uploads", $file_name);
                $modProduct->imagen = $file_name;
            }
        } catch (\Throwable $th) {
            $modProduct->imagen = $oldProduct->imagen;
        }
        $result = $this->producto::where('id_producto', $id_producto)->update($modProduct->toArray());
        return $this->producto::where("id_producto", $id_producto)->with("categorias", "alergenos")->get()->first();
        // if ($result || $result1 || $result2) {
        //     return "Producto modificado";
        // } else {
        //     return "No se ha modificado el producto";
        // }
    }
}
