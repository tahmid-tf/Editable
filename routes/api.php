<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResetPasswordController;
use Illuminate\Http\Request;
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



Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('/forgot-password', [ResetPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('user', [AuthController::class, 'user']);

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout_all_devices', [AuthController::class, 'logout_all_devices']);

});
