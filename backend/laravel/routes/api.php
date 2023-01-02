<?php

use App\Http\Controllers\AlergenoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/public/{image}', [FileController::class, 'getImage']);

Route::prefix("/reservas")->group(function() {
    Route::get("/", [ReservaController::class, 'getReserves']);
    Route::get("/{id_reserva}", [ReservaController::class, 'getReserva']);
    Route::post("/", [ReservaController::class, 'createReserva']);
    Route::post("/update", [ReservaController::class, 'updateReserva']);
});

Route::prefix("/clients")->middleware('jwt.verify')->group(function() {
    Route::get("/", [ClienteController::class, "getClientes"]);
});

Route::prefix("/auth")->group(function() {
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");
    Route::get("/test", [AuthController::class, "test"])->name("test");

    Route::middleware('jwt.verify')->group(function() {
        Route::get("/isAdmin", [AuthController::class, "isAdmin"]);
        Route::get('refresh', [AuthController::class, 'refresh']);
        Route::get('/profile', [AuthController::class, 'me']);
    });
});

Route::prefix('productos')->group(function (){
    Route::get('/',[ProductoController::class, 'getProducts']);

    Route::middleware('jwt.verify')->group(function() {
        Route::post('/',[ProductoController::class, 'addProduct']);
        Route::delete('/{id_producto}',[ProductoController::class, 'deleteProduct']);
        Route::put('/{id_producto}',[ProductoController::class, 'updateProduct']);
    });

});

Route::prefix('categorias')->group(function (){
    Route::get('/',[CategoriaController::class, 'getCategories']);

    Route::middleware('jwt.verify')->group(function() {
        Route::post('/',[CategoriaController::class, 'addCategory']);
        Route::delete('/{id_categoria}',[CategoriaController::class, 'deleteCategory']);
        Route::put('/{id_categoria}',[CategoriaController::class, 'updateCategory']);
    });
});

Route::prefix('alergenos')->group(function (){
    Route::get('/',[AlergenoController::class, 'getAllergens']);

    Route::middleware('jwt.verify')->group(function() {
        Route::post('/',[AlergenoController::class, 'addAllergen']);
        Route::delete('/{id_alergeno}',[AlergenoController::class, 'deleteAllergen']);
        Route::put('/{id_alergeno}',[AlergenoController::class, 'updateAllergen']);
    });
});
