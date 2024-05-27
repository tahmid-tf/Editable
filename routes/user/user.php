<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum','user'])->prefix('user')->group(function () {
   Route::get('test_user', function (){
       return response()->json([
           'response' => 'this is an user account'
       ]);
   });
});
