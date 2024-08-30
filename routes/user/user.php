<?php

use App\Http\Controllers\Api\Admin\Order\FindingStylesController;
use App\Http\Controllers\Api\Admin\Order\SelectedStyleWithAmountCalculationController;
use App\Http\Controllers\Api\User\TableSearch\UserTableDataController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\User\GeneralSettingsController;

Route::middleware(['auth:sanctum', 'user'])->prefix('user')->group(function () {

    Route::get('test_user', function () {
        return response()->json([
            'response' => 'this is an user account'
        ]);
    });


//    ----------------------------------------- categories for users when ordering and selected style with amount calculation -----------------------------------------

    Route::get('category', [\App\Http\Controllers\Api\Admin\CategoryController::class,'index']);
    Route::post('selected_style_with_amount_calculation', [SelectedStyleWithAmountCalculationController::class, 'amount']);

//    ----------------------------------------- categories for users when ordering and selected style with amount calculation -----------------------------------------

//    -------------------------------------- General Settings - Change Password --------------------------------------

    Route::post('change_password', [GeneralSettingsController::class, 'changePassword']);

//    -------------------------------------- General Settings - Change Password --------------------------------------

//    -------------------------------------- search style by categories  --------------------------------------

    Route::post('general_info_and_category', [FindingStylesController::class, 'general_info_and_category_from_user']);

//    -------------------------------------- search style by categories  --------------------------------------

//    -------------------------------------- order list, storing order with payment gateway --------------------------------------

    Route::get('users_order_list', [UserTableDataController::class, 'users_order_data']);
    Route::post('order_store', [\App\Http\Controllers\Api\User\Order\OrderController::class, 'store']);

//    -------------------------------------- order list, storing order with payment gateway --------------------------------------



});
