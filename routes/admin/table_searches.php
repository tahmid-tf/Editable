<?php

use App\Http\Controllers\Api\Admin\TableSearch\TableSearchController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {


//    ----------------------------------- Transaction list from admin side API -----------------------------------

    Route::get('transactions', [TableSearchController::class, 'transaction']);

//    ----------------------------------- Transaction list from admin side API -----------------------------------

});

