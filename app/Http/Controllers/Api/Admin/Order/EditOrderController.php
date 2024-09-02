<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Editor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use App\Models\Api\Admin\Order;
use Symfony\Component\HttpFoundation\Response;

class EditOrderController extends Controller
{

    // --------------------------- Edit order from admin side ---------------------------

    public function edit_order(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'order_id' => 'required',
                'editor_id' => 'required',
                'order_status' => 'nullable|in:pending,completed,cancelled',
                'payment_status' => 'nullable|in:pending,successful,failed',
                'preview_edit_link' => 'nullable',
                'file_uploaded_by_admin_after_edit' => 'nullable',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

            // ----------------- validating if order is not found

            $order = Order::find($inputs['order_id']);

            if (!$order) {
                return response()->json([
                    'message' => 'Order not found',
                    'status' => 404,
                ], Response::HTTP_NOT_FOUND);
            }

            // --------------- validating if editor is not found

            $editor = Editor::find($inputs['editor_id']);

            if (!$editor) {
                return response()->json([
                    'message' => 'Editor not found',
                    'status' => 404,
                ], Response::HTTP_NOT_FOUND);
            }

            // --------------- if order work is not completed


            if ($order->order_status != 'completed' && $inputs['order_status'] == 'completed') {

                Order::where('id', $inputs['order_id'])->update([
                    'editors_id' => $inputs['editor_id'],
                    'payment_status' => $inputs['payment_status'],
                ]);

                return response()->json([
                    'message' => 'Order Status is not completed, please complete the process from the list, however the Editors information and payment status is being updated.',
                    'order_id' => $order->order_id,
                    'status' => 200,
                ], 200);
            }

            // --------------------------- if order status is pending or cancelled

            if ($order->order_status == 'pending' || $order->order_status == 'cancelled') {

                Order::where('id', $inputs['order_id'])->update([
                    'editors_id' => $inputs['editor_id'],
                    'order_status' => $inputs['order_status'],
                    'payment_status' => $inputs['payment_status'],
                ]);

                $order->file_uploaded_by_admin_after_edit = null;
                $order->order_delivery_date = null;
                $order->save();

                return response()->json([
                    'message' => 'Order Status Updated Successfully, the editors info, order status and payment status are being updated.',
                    'order_status' => $order->order_status,
                    'order_id' => $order->order_id,
                    'status' => 200,
                    'file_uploaded_by_admin_after_edit' => 'removed',
                    'order_delivery_date' => 'removed',
//                    'data' => $order,
                ], 200);
            }

            //  --------------------------------- if order status is completed

            if ($order->order_status == 'completed') {

                Order::where('id', $inputs['order_id'])->update([
                    'editors_id' => $inputs['editor_id'],
                    'order_status' => $inputs['order_status'],
                    'payment_status' => $inputs['payment_status'],
                    'file_uploaded_by_admin_after_edit' => $inputs['file_uploaded_by_admin_after_edit'],
                ]);

                return response()->json([
                    'message' => 'Order Status Updated Successfully',
                    'order_status' => $order->order_status,
                    'order_id' => $order->order_id,
                    'status' => 200,
//                    'data' => $order,
                ], 200);
            }

            // ----------------------------------- if order status is in preview mode

//            if ($order->order_status == 'preview') {
//
//                Order::where('id', $inputs['order_id'])->update([
//                    'editors_id' => $inputs['editor_id'],
//                    'payment_status' => $inputs['payment_status'],
//                ]);
//
//                return response()->json([
//                    'message' => 'Order Status is currently on preview state, please complete the process from the list, the Editors information and payment status is being updated.',
//                    'order_id' => $order->order_id,
//                    'status' => 200,
//                ], 200);
//            }

            // --------------- Updating order

//            Order::where('id', $inputs['order_id'])->update([
//                'editors_id' => $inputs['editor_id'],
//                'order_status' => $inputs['order_status'],
//                'payment_status' => $inputs['payment_status'],
//                'file_uploaded_by_admin_after_edit' => $inputs['file_uploaded_by_admin_after_edit'],
//            ]);

            // --------------- preview edits [ Still on progress ]

//            return response()->json([
//                'message' => 'Order Status Updated Successfully',
//                'status' => 200,
//            ], 200);


        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

    }

    // --------------------------- Edit order from admin side ---------------------------


}
