<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('test_admin', function () {
        return response()->json([
            'response' => 'this is an admin account'
        ]);
    });


//    ------------------------------------- categories resource -------------------------------------

    Route::get('category', [\App\Http\Controllers\Api\Admin\CategoryController::class,'index']);
    Route::post('category_store', [\App\Http\Controllers\Api\Admin\CategoryController::class,'store']);
    Route::put('category/update/{id}', [\App\Http\Controllers\Api\Admin\CategoryController::class,'update']);
    Route::delete('category/delete/{id}', [\App\Http\Controllers\Api\Admin\CategoryController::class,'destroy']);

//    ------------------------------------- categories resource -------------------------------------
});
