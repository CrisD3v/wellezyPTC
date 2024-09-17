<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Rutas para la autenticación del usuario (públicas)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas protegidas (requieren autenticación con JWT)
Route::middleware('auth:api')->group(function () {
    Route::post('/airports/{city}', [ApiController::class, 'airports']);
    Route::post('/flights', [ApiController::class, 'flights']);
    Route::post('/reserves/{id_user}', [ApiController::class, 'reserves']);
    Route::get('/reserves', [ApiController::class, 'get_Reserves_Itineraries']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
});

