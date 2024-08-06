<?php

use App\Http\Controllers\Api\Admin\TableSearch\TransactionSearchController;
use App\Http\Controllers\Api\Admin\TableSearch\UserTableDataController;
use Illuminate\Support\Facades\Route;

Route::get('transaction_export_test', [TransactionSearchController::class, 'transactions_data_export']);
//Route::get('users_data_export', [UserTableDataController::class, 'ordered_users_data_export']);


Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {

//    ----------------------------------- Transaction list from admin side API -----------------------------------

    Route::get('transactions', [TransactionSearchController::class, 'transaction']);

//    ----------------------------------- Transaction list from admin side API -----------------------------------

//    ----------------------------------- Transaction list export admin side API -----------------------------------

    Route::get('transaction_export', [TransactionSearchController::class, 'transactions_data_export']);

//    ----------------------------------- Transaction list export admin side API -----------------------------------


//    ----------------------------------- Users list and total orders from admin side API -----------------------------------

    Route::get('users_info', [UserTableDataController::class, 'users_data']);

//    ----------------------------------- Users list and total orders from admin side API -----------------------------------

//    ----------------------------------- Single Users list and total orders from admin sided API -----------------------------------

    Route::get('users_info/{email}', [UserTableDataController::class, 'single_user_data']);

//    ----------------------------------- Single Users list and total orders from admin sided API -----------------------------------

//    ----------------------------------- Users list export from admin side API -----------------------------------

    Route::get('users_data_export', [UserTableDataController::class, 'ordered_users_data_export']);

//    ----------------------------------- Users list export from admin side API -----------------------------------



});

