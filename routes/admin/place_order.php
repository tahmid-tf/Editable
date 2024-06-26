<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\Order\PlaceOrderController;


// Place order routes

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('test_admin', function () {
        return response()->json([
            'response' => 'this is an admin account'
        ]);
    });

    // --------------------------- search style by categories with user info ---------------------------

    Route::post('general_info_and_category', [PlaceOrderController::class, 'general_info_and_category']);

    // --------------------------- search style by categories with user info ---------------------------





});


