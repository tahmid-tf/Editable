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

    // -------------------- Stage 4 - Admin can send again a link again if its rejected --------------------


    public function requestAgainAfterRejection(Request $request)
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


            // ----------------------- validating if the last request was rejected -----------------------

            if (!$preview_order_data->users_decision == "rejected") {
                return response()->json([
                    'data' => "The last request wasn't rejected by the user",
                    'status' => 409,
                ], Response::HTTP_CONFLICT);
            }

            // ----------------------- adding a new preview edit row if the latest one is rejected -----------------------

            PreviewEdit::create([
                'order_id' => $order->id,
                'preview_link' => $inputs['preview_link'],
            ]);

            // ----------------------- adding a new preview edit row if the latest one is rejected -----------------------


            $order->update([
                'preview_edit_status' => 'user_review_pending',
                'order_status' => 'pending'
            ]);

            return response()->json([
                'data' => 'New preview edit link updated successfully after rejected by the user',
                'preview_link' => $inputs['preview_link'],
                'order_id' => $inputs['order_id'],
                'status' => Response::HTTP_OK,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }
    }


    // -------------------- retrieving all specific preview edits data from specific orders --------------------

    public function retrievePreviewEditsData(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'order_id' => 'required',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();
            $order_id = $inputs['order_id'];

            $order = Order::find($order_id);

            // checking if order data really exists

            if (!$order) {
                return response()->json([
                    'data' => 'Order data not found',
                    'status' => 404,
                ], Response::HTTP_NOT_FOUND);
            }

            if ($order->preview_edits == "yes") {
                $preview_edits_data = PreviewEdit::where('order_id', $order->id)->orderBy('id', 'desc')->get();

                return response()->json([
                    'data' => $preview_edits_data,
                    'status' => Response::HTTP_OK,
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'message' => 'No preview edits available for this order.',
                    'status' => Response::HTTP_NOT_FOUND,
                ], Response::HTTP_NOT_FOUND);
            }


        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }


    }
}
