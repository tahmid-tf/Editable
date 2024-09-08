<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// ---------------------------- development based routes ----------------------------

//Route::get('dev/delete_data_test/{id}', function ($id) {
//    \App\Models\Api\Admin\Order::where('id', $id)->forceDelete();
//
//
//    if (\App\Models\PreviewEdit::where('order_id', $id)->exists()) {
//        \App\Models\PreviewEdit::where('order_id', $id)->forceDelete();
//    }
//
//    return "Dev mode delete executed";
//});
