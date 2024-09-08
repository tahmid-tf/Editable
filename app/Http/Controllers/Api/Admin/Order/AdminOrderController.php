<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Editor;
use App\Models\Api\Admin\Order;
use App\Models\Api\Admin\Style;
use App\Models\PreviewEdit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;


class AdminOrderController extends Controller
{
    public function search()
    {

        $query = Order::query();

        $searchParams = [
            'email' => request('email'),
            'order_status' => request('order_status'),
            'payment_status' => request('payment_status'),
            'editor' => request('editor'),
            'start_date' => request('start_date'),
            'end_date' => request('end_date'),
        ];

        if ($searchParams['email']) {
            $query->where('users_email', 'LIKE', '%' . $searchParams['email'] . '%');
        }

        if ($searchParams['order_status']) {
            $query->where('order_status', $searchParams['order_status']);
        }

        if ($searchParams['payment_status']) {
            $query->where('payment_status', $searchParams['payment_status']);
        }

        if ($searchParams['editor']) {
            $editor = Editor::withTrashed()->where('editor_name', 'LIKE', '%' . $searchParams['editor'] . '%')->first();
            if ($editor) {
                $query->where('editors_id', $editor->id);
            } else {
                // If no editor is found, set the query to return no results
                $query->whereNull('editors_id');
            }
        }

        if ($searchParams['start_date']) {
            $end_date = $searchParams['end_date'] ?: $searchParams['start_date'];
            $query->whereBetween('created_at', [$searchParams['start_date'], $end_date]);
        }


        $paginate = request('paginate', 10);
        $orders = $query->orderBy('created_at', 'desc')->paginate($paginate);

        $total_orders_count = $query->count();
        $completed_orders_count = (clone $query)->where('order_status', 'completed')->count();
        $pending_orders_count = (clone $query)->where('order_status', 'pending')->count();
        $cancelled_orders_count = (clone $query)->where('order_status', 'cancelled')->count();
        $preview_orders_count = (clone $query)->where('order_status', 'preview')->count();

        $orders->getCollection()->transform(function ($order) {
            $order->category = Category::withTrashed()->find($order->category_id);
            $order->editor = Editor::withTrashed()->find($order->editors_id);
            $order->styles = Style::withTrashed()->whereIn('id', json_decode($order->styles_array))->get();

            return $order;
        });


        return response()->json([
            'total_orders_count' => $total_orders_count,
            'pending_orders_count' => $pending_orders_count,
            'cancelled_orders_count' => $cancelled_orders_count,
            'completed_orders_count' => $completed_orders_count,
            'preview_orders_count' => $preview_orders_count,
            'data' => $orders
        ]);
    }

    public function store(Request $request)
    {
        //        ------------------------------------------------- validation block -------------------------------------------------


        try {
            $validator = Validator::make($request->all(), [
                'users_email' => 'required|string|email',
                'users_phone' => 'required|string',
                'order_type' => 'required|in:standard,express,custom',
                'order_name' => 'required|string|max:255',
                'category_id' => 'required|integer',
                'payment_status' => 'nullable|in:pending,successful,failed',
//                'order_date' => 'nullable',
//                'order_id' => 'nullable|string',
                'amount' => 'required|integer',
//                'editors_id' => 'nullable|string|max:255',
                'order_status' => 'required|in:pending,completed,cancelled',
                'file_uploaded_by_user' => 'nullable|string',
//                'file_uploaded_by_admin_after_edit' => 'nullable|string|max:255',
                'styles_array' => 'required|json',
                'number_of_images_provided' => 'required|integer',
                'culling' => 'nullable|in:yes,no',
                'images_culled_down_to' => 'nullable|string|max:255',
                'select_image_culling_type' => 'nullable|string|max:255',
                'skin_retouching' => 'nullable|in:yes,no',
                'skin_retouching_type' => 'nullable|string|max:255',
                'additional_info' => 'nullable|in:yes,no',
                'preview_edits' => 'nullable|in:yes,no',
                'user_id' => 'nullable|string',
//                'order_delivery_date' => 'nullable',
//                'preview_edit_status' => 'nullable|in:no,user_review_pending,accepted,rejected,pending',
                'users_name' => 'nullable',

            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

            $inputs['user_id'] = auth()->id() ?? null;

//        ------------------------------------------------- validation block -------------------------------------------------

//            ------------- if the order has preview edits with it  ----------------

            if (isset($inputs['preview_edits']) && $inputs['preview_edits'] == "no") {
                $inputs['preview_edits'] = "no";
                $inputs['preview_edit_status'] = "no";
            } elseif (isset($inputs['preview_edits']) && $inputs['preview_edits'] == "yes") {
                $inputs['preview_edits'] = "yes";
                $inputs['preview_edit_status'] = "pending";
            } else {
                $inputs['preview_edits'] = "no";
                $inputs['preview_edit_status'] = "no";
            }

//            ------------- if the order has preview edits with it  ----------------


//        ------------------------------------------------- code block -------------------------------------------------


            $order = Order::create($inputs);


//            ----------------------------- order id creation and initiating order_id -----------------------------

            $order['order_id'] = Order::order_id_creation();
            $order->save();

//            ----------------------------- order id creation and initiating order_id -----------------------------


//            ------------- if the order has preview edits with it , adding columns to PreviewEdit model ----------------

            if ($order->preview_edits == "yes") {
                PreviewEdit::create([
                    'order_id' => $order->id,
                ]);

            }

//            ------------- if the order has preview edits with it , adding columns to PreviewEdit model ----------------

            return response()->json([
                'data' => $order,
                'message' => 'Order created successfully.',
                'status' => 200
            ], 200);

//        ------------------------------------------------- code block -------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------

    }

    public function tested_search_with_paginate()
    {
        $query = Order::query();

        $searchParams = [
            'email' => request('email'), // updated to dynamic search parameters, name is still email cause, no need to change any code from frontend side
            'order_status' => request('order_status'),
            'payment_status' => request('payment_status'),
            'editor' => request('editor'),
            'start_date' => request('start_date'),
            'end_date' => request('end_date'),
        ];

//        -------------------------- dynamic column mapping --------------------------

        $query->where(function ($q) use ($searchParams) {
            $q->where('users_email', 'LIKE', '%' . $searchParams['email'] . '%')
                ->orWhere('order_id', 'LIKE', '%' . $searchParams['email'] . '%')
                ->orWhere('order_name', 'LIKE', '%' . $searchParams['email'] . '%');
        });

//        -------------------------- dynamic column mapping --------------------------

//        if ($searchParams['email']) {
//            $query->where('users_email', 'LIKE', '%' . $searchParams['email'] . '%');
//        }

        if ($searchParams['order_status']) {
            $query->where('order_status', $searchParams['order_status']);
        }

        if ($searchParams['payment_status']) {
            $query->where('payment_status', $searchParams['payment_status']);
        }

        if ($searchParams['editor']) {
            $editor = Editor::withTrashed()->where('editor_name', 'LIKE', '%' . $searchParams['editor'] . '%')->first();
            if ($editor) {
                $query->where('editors_id', $editor->id);
            } else {
                // If no editor is found, set the query to return no results
                $query->whereNull('editors_id');
            }
        }

//        ---------------------------- between start data and end date modification ----------------------------

//        if ($searchParams['start_date']) {
//            $end_date = $searchParams['end_date'] ?: $searchParams['start_date'];
//            $query->whereBetween('created_at', [$searchParams['start_date'], $end_date]);
//        }

        Order::time_calculation($searchParams['start_date'], $searchParams['end_date'], $query);


//        ---------------------------- between start data and end date modification ----------------------------


        $paginate = request('paginate', 10);
        $orders = $query->orderBy('created_at', 'desc')->paginate($paginate);

        // Count values based on the paginated results
        $paginatedOrders = $orders->getCollection();
        $total_orders_count = $paginatedOrders->count();
        $completed_orders_count = $paginatedOrders->where('order_status', 'completed')->count();
        $pending_orders_count = $paginatedOrders->where('order_status', 'pending')->count();
        $cancelled_orders_count = $paginatedOrders->where('order_status', 'cancelled')->count();
        $preview_orders_count = $paginatedOrders->where('order_status', 'preview')->count();

        $orders->getCollection()->transform(function ($order) {
            $order->category = Category::withTrashed()->find($order->category_id);
            $order->editor = Editor::withTrashed()->find($order->editors_id);
            $order->styles = Style::withTrashed()->whereIn('id', json_decode($order->styles_array))->get();

            return $order;
        });

        return response()->json([
            'entire_order_count' => $query->count(),
            'total_orders_count' => $total_orders_count,
            'pending_orders_count' => $pending_orders_count,
            'cancelled_orders_count' => $cancelled_orders_count,
            'completed_orders_count' => $completed_orders_count,
            'preview_orders_count' => $preview_orders_count,
            'data' => $orders,
        ]);
    }
}

