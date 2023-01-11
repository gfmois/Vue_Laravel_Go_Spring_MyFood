<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {
    public function __construct() {
        $this->middleware('jwt.auth', ['except' => ['login', 'register']]);
    }

    public function login(Request $data) {
        $data->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $credentials = $data->only('email', 'password');
        $token = Auth::attempt($credentials);

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

    public function test() {
        return Admin::all();
    }

    public function register(Request $data) {
        $data->validate([
            "email" => 'required|string|email',
            "password" => 'required|string|min:6',
            "username" => 'required|string',
        ]);

        $uuid = "";
        foreach(explode("-", Uuid::uuid1()) as $item) {
            $uuid .= $item;
        }

        $user = Admin::create([
            "id_usuario" => substr($uuid, 0, 10),
            "nombre" => $data->username,
            "email" => $data->email,
            "contraseña" => Hash::make($data->password),
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

    public function isAdmin() {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'user not found'
                ], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'token invalid'
            ], 401);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'token invalid'
            ], 401);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'token not found'
            ], 401);
        }

        return response()->json([
            'status' => "success",
            "message" => [
                "isAdmin" => "true",
                "token" => (string)Auth::getToken(),
                "user" => $user
            ],
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json([
            "status" => "success",
            "message" => "Successfully logged out"
        ]);
    }

    public function me() {
        $token = (string)JWTAuth::getToken();
        return [
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => 'User fetched successfully!',
            ],
            'data' => [
                'user' => JWTAuth::toUser($token),
                'token' => $token,
            ],
        ];
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => auth()->user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
