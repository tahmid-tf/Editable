<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Editor;
use App\Models\Api\Admin\Order;
use App\Models\Api\Admin\Style;
use Illuminate\Http\Request;

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
//
//        if ($searchParams['email']) {
//            $query->where('users_email', 'LIKE', '%' . substr($searchParams['email'], 1, -1) . '%');
//        }

        if ($searchParams['email']) {
            $query->where('users_email', 'LIKE', '%' .$searchParams['email']. '%');
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
        $orders = $query->paginate($paginate);

        $orders->getCollection()->transform(function ($order) {
            $order->category = Category::withTrashed()->find($order->category_id);
            $order->editor = Editor::withTrashed()->find($order->editors_id);
            $order->styles = Style::withTrashed()->whereIn('id', json_decode($order->styles_array))->get();

            return $order;
        });

        return response()->json([
            'data' => $orders
        ]);
    }
}
