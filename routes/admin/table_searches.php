<?php

use App\Http\Controllers\Api\Admin\TableSearch\TransactionSearchController;
use Illuminate\Support\Facades\Route;

Route::get('transaction_export_test', [TransactionSearchController::class, 'transactions_data_export']);


Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

//    ----------------------------------- Transaction list from admin side API -----------------------------------

    Route::get('transactions', [TransactionSearchController::class, 'transaction']);

//    ----------------------------------- Transaction list from admin side API -----------------------------------

//    ----------------------------------- Transaction list export admin side API -----------------------------------

    Route::get('transaction_export', [TransactionSearchController::class, 'transactions_data_export']);

//    ----------------------------------- Transaction list export admin side API -----------------------------------


//    ----------------------------------- Users list from admin side API -----------------------------------



//    ----------------------------------- Users list from admin side API -----------------------------------

//    ----------------------------------- Users list export from admin side API -----------------------------------

//    ----------------------------------- Users list export from admin side API -----------------------------------


});

