<?php

namespace App\Http\Controllers\Api\PreviewEdit;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Order;
use App\Models\PreviewEdit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class UserPreviewEditController extends Controller
{
    public function users_decision(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'order_id' => 'required',
                'users_decision' => "required|in:accepted,rejected",
                'comment' => 'nullable',
//                'users_decision_date' => "nullable",
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

            // ----------------- validating if user email is an authenticated one

            if ($order->users_email != auth()->user()->email) {
                return response()->json([
                    'data' => "The data doesn't belong to the current user",
                    'status' => 422,
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }


            // ----------------- if its not found in preview edits table

            $preview_order_data = PreviewEdit::where('order_id', $inputs['order_id'])->orderBy('id', 'desc')->first();

            if (!$preview_order_data) {
                return response()->json([
                    'data' => 'Preview order data data not found',
                    'status' => 404,
                ], Response::HTTP_NOT_FOUND);
            }

            // ----------------- Checking if preview_edit_status in user_review_pending state

            if ($order->preview_edit_status != 'user_review_pending') {
                return response()->json([
                    'data' => 'The current order is not in user review pending state',
                    'status' => 409,
                ], Response::HTTP_CONFLICT);
            }


            // ---------------------------------- users decision

            $preview_order_data->update([
                'comment' => $inputs['comment'],
                'users_decision' => $inputs['users_decision'],
                'users_decision_date' => now(),
            ]);

            // --------------------------------- order status updating based on users decision

            $order->update([
                'preview_edit_status' => $inputs['users_decision'],
                'order_status' => 'pending',
            ]);

            return response()->json([
                'data' => 'User decision data updated successfully',
                'decision' => $inputs['users_decision'],
                'status' => 200,
            ],Response::HTTP_OK);


        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }
    }
}
