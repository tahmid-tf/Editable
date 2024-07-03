<?php

use App\Http\Controllers\Api\Admin\SelectedStyleWithAmountCalculationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\Order\FindingStylesController;


// Place order routes

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('test_admin', function () {
        return response()->json([
            'response' => 'this is an admin account'
        ]);
    });

    // --------------------------- search style by categories with user info [ Stage 1 ] ---------------------------

    Route::post('general_info_and_category', [FindingStylesController::class, 'general_info_and_category']);

    // --------------------------- search style by categories with user info [ Stage 1 ] ---------------------------

    // --------------------------- selected style with amount calculation [ Stage 2 ] ---------------------------

    Route::post('selected_style_with_amount_calculation', [SelectedStyleWithAmountCalculationController::class, 'amount']);

    // --------------------------- selected style with amount calculation [ Stage 2 ] ---------------------------


});


