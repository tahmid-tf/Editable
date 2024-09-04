<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PreviewEdit\UserPreviewEditController;

Route::middleware(['auth:sanctum', 'user'])->prefix('user/preview')->group(function () {

//    -------------------- Stage 1, occurred automatically when ordering --------------------

    Route::post('decision', [UserPreviewEditController::class,'users_decision']);

//    -------------------- Stage 2, admin will upload the edited image link --------------------

});
