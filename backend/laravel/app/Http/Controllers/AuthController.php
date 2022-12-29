<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\StoreAuthLoginRequest;
use App\Models\Admin;
use App\Models\Cliente;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AuthController extends Controller {
    public function __construct() {
        // $this->middleware("auth:api", ["except" => ['login', 'register']]);
    }

    public function login(Request $data) {
        $data->validate([
            'email' => 'required|string|email',
            "password" => 'required|string'
        ]);

        $credentials = $data->only('email', 'password');
        $token = Auth::attempt($credentials);

        return $token;

        if (!$token) {
            return response()->json([
                "status" => "error",
                "message" => "Unauthorized"
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            "status" => "success",
            "user" => $user,
            "authorization" => [
                "token" => $token,
                "type" => "Bearer"
            ]
        ]);
    }

    public function register(Request $data) {
        $data->validate([
            "email" => 'required|string|email|unique:usuarios',
            "password" => 'required|string|min:6',
            "username" => 'required|string|unique:usuarios,usuario',
        ]);

        $uuid = "";
        foreach(explode("-", Uuid::uuid1()) as $item) {
            $uuid .= $item;
        }

        $user = Admin::create([
            "id_usuario" => substr($uuid, 0, 10),
            "email" => $data->email,
            "contraseña" => Hash::make($data->password),
            "usuario" => $data->username,
            "cargo" => "Administrador",
            "avatar" => "https://api.multiavatar.com/" . $data->username . ".png"
        ]);

        $token = Auth::login($user);
        return response()->json([
            "status" => "success",
            "messages" => "User Created Succesfully",
            "user" => $user,
            "authorization" => [
                "token" => $token,
                "type" => "Bearer"
            ]
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json([
            "status" => "success",
            "message" => "Successfully logged out"
        ]);
    }

    public function getProfile() {
        return response()->json([
            "status" => "success",
            "user" => Auth::user()
        ]);
    }
}
