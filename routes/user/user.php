<?php

use App\Http\Controllers\Api\Admin\Order\FindingStylesController;
use App\Http\Controllers\Api\User\TableSearch\UserTableDataController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\GeneralSettingsController;

Route::middleware(['auth:sanctum', 'user'])->prefix('user')->group(function () {

    Route::get('test_user', function () {
        return response()->json([
            'response' => 'this is an user account'
        ]);
    });

//    -------------------------------------- General Settings - Change Password --------------------------------------

    Route::post('change_password', [GeneralSettingsController::class, 'changePassword']);


//    -------------------------------------- General Settings - Change Password --------------------------------------

//    -------------------------------------- User order lists --------------------------------------

    Route::get('users_order_list', [UserTableDataController::class, 'users_order_data']);

//    -------------------------------------- User order lists --------------------------------------

//    -------------------------------------- search style by categories [ Stage 1 ] --------------------------------------

//    Route::post('general_info_and_category', [FindingStylesController::class, 'general_info_and_category_from_user']);

//    -------------------------------------- search style by categories [ Stage 1 ] --------------------------------------


});
