<?php

use App\Http\Controllers\Api\Admin\TableSearch\TableSearchController;
use Illuminate\Support\Facades\Route;

Route::get('transaction_export_test', [TableSearchController::class, 'transactions_data_export']);


Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

//    ----------------------------------- Transaction list from admin side API -----------------------------------

    Route::get('transactions', [TableSearchController::class, 'transaction']);

//    ----------------------------------- Transaction list from admin side API -----------------------------------

//    ----------------------------------- Transaction list export admin side API -----------------------------------

    Route::get('transaction_export', [TableSearchController::class, 'transactions_data_export']);

//    ----------------------------------- Transaction list export admin side API -----------------------------------

});

