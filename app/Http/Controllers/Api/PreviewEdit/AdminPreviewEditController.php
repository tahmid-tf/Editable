<?php

namespace App\Http\Controllers\Api\PreviewEdit;

use App\Http\Controllers\Controller;
use App\Models\PreviewEdit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Api\Admin\Order;
use Symfony\Component\HttpFoundation\Response;

class AdminPreviewEditController extends Controller
{

    // -------------------- Upload edited image link --------------------

    public function uploadPreviewImageLink(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'order_id' => 'required',
                'preview_link' => 'required',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();


            // ----------------- validating if order exists

            $order = Order::find($inputs['order_id']);

            if (!$order) {
                return response()->json([
                    'data' => 'Order data not found',
                    'status' => 404,
                ], Response::HTTP_NOT_FOUND);
            }

            // ----------------- if its not found in preview edits table

            $preview_order_data = PreviewEdit::where('order_id', $inputs['order_id'])->orderBy('id', 'desc')->first();

            if (!$preview_order_data) {
                return response()->json([
                    'data' => 'Preview order data data not found',
                    'status' => 404,
                ], Response::HTTP_NOT_FOUND);
            }


            // ----------------------- updating preview_link from preview_edits table

            $preview_order_data->update(['preview_link' => $inputs['preview_link']]);

            // ----------------------- updating preview_edit_status from orders table

            $order->update([
                'preview_edit_status' => 'user_review_pending',
                'order_status' => 'pending'
            ]);

            return response()->json([
                'data' => 'Preview edit link updated successfully',
                'preview_link' => $inputs['preview_link'],
                'order_id' => $inputs['order_id'],
                'status' => Response::HTTP_OK,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

    }
}
