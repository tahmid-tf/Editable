<?php

use App\Http\Controllers\Api\User\GeneralSettingsController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('test_admin', function () {
        return response()->json([
            'response' => 'this is an admin account'
        ]);
    });


//    ------------------------------------- categories resource api -------------------------------------

    Route::get('category', [\App\Http\Controllers\Api\Admin\CategoryController::class,'index']);
    Route::get('category_single/{id}', [\App\Http\Controllers\Api\Admin\CategoryController::class,'show']);
    Route::post('category_store', [\App\Http\Controllers\Api\Admin\CategoryController::class,'store']);
    Route::put('category/update/{id}', [\App\Http\Controllers\Api\Admin\CategoryController::class,'update']);
    Route::delete('category/delete/{id}', [\App\Http\Controllers\Api\Admin\CategoryController::class,'destroy']);

//    ------------------------------------- categories resource api -------------------------------------

//    ------------------------------------- editors resource api -------------------------------------

    Route::get('editors', [\App\Http\Controllers\Api\Admin\EditorController::class,'index']);
    Route::get('editor/{id}', [\App\Http\Controllers\Api\Admin\EditorController::class,'show']);
    Route::post('editor_store', [\App\Http\Controllers\Api\Admin\EditorController::class,'store']);
    Route::put('editor/update/{id}', [\App\Http\Controllers\Api\Admin\EditorController::class,'update']);
    Route::delete('editor/{id}/delete', [\App\Http\Controllers\Api\Admin\EditorController::class,'destroy']);

//    ------------------------------------- editors resource api -------------------------------------

//    ------------------------------------- editors style creation api -------------------------------------

    Route::get('styles', [\App\Http\Controllers\Api\Admin\StyleController::class,'index']);
    Route::post('style_store', [\App\Http\Controllers\Api\Admin\StyleController::class,'store']);
    Route::get('style/{id}', [\App\Http\Controllers\Api\Admin\StyleController::class,'show']);
    Route::put('style/update/{id}', [\App\Http\Controllers\Api\Admin\StyleController::class,'update']);
    Route::delete('style/{id}/delete', [\App\Http\Controllers\Api\Admin\StyleController::class,'destroy']);

    Route::post('style/file_string_output', [\App\Http\Controllers\Api\Admin\StyleController::class,'file_string_output']);


//    ------------------------------------- editors style creation api -------------------------------------

//    -------------------------------------- General Settings - Change Password --------------------------------------

    Route::post('change_password', [GeneralSettingsController::class, 'changePassword']);

//    -------------------------------------- General Settings - Change Password --------------------------------------
});
