<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\GeneralSettingsController;

Route::middleware(['auth:sanctum','user'])->prefix('user')->group(function () {

    Route::get('test_user', function (){
        return response()->json([
            'response' => 'this is an user account'
        ]);
    });

//    -------------------------------------- General Settings - Change Password --------------------------------------

    Route::post('change_password', [GeneralSettingsController::class, 'changePassword']);


//    -------------------------------------- General Settings - Change Password --------------------------------------



});
