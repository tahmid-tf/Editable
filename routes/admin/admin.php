<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('test_admin', function () {
        return response()->json([
            'response' => 'this is an admin account'
        ]);
    });


//    ------------------------------------- categories resource -------------------------------------

    Route::post('test_category_post', [\App\Http\Controllers\Api\Admin\CategoryController::class,'store']);

//    Route::apiResource('category', \App\Http\Controllers\Api\Admin\CategoryController::class);

//    ------------------------------------- categories resource -------------------------------------
});
