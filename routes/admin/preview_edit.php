<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PreviewEdit\AdminPreviewEditController;


Route::middleware(['auth:sanctum', 'admin'])->prefix('admin/preview')->group(function () {

    //    -------------------- Stage 1, occurred automatically when ordering

    // -------------------- Stage 3 - Upload edited image link --------------------

    Route::post('upload_preview_image_link', [AdminPreviewEditController::class, 'uploadPreviewImageLink']);

    // -------------------- Stage 4 - Admin can send again a link again if its rejected --------------------

    Route::post('new_request_after_rejection', [AdminPreviewEditController::class, 'requestAgainAfterRejection']);

});
