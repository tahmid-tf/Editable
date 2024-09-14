<?php

namespace App\Http\Controllers\Api\User\TableSearch;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Order;
use App\Models\User;
use Illuminate\Http\Request;

class UserTableDataController extends Controller
{


    //    ----------------------------------- Users list and total orders from user side API -----------------------------------

    public function users_order_data()
    {

//        Search params

        $query = Order::query();

        $searchParams = [
            'order_id' => request('order_id'),
            'order_status' => request('order_status'),
            'payment_status' => request('payment_status'),
            'start_date' => request('start_date'),
            'end_date' => request('end_date'),
        ];

        $email = auth()->user()->email;
        $query->where('users_email', $email);

//        if ($searchParams['order_id']) {
//            $query->where('order_id', $searchParams['order_id']);
//        }

//        ----------------------------- dynamic parameters by order id -----------------------------


        $query->where(function ($q) use ($searchParams) {
            $q->where('order_id', 'LIKE', '%' . $searchParams['order_id'] . '%')
                ->orWhere('order_name', 'LIKE', '%' . $searchParams['order_id'] . '%');
//                ->orWhere('order_name', 'LIKE', '%' . $searchParams['email'] . '%');
        });

//        ----------------------------- dynamic parameters by order id -----------------------------


        if ($searchParams['order_status']) {
            $query->where('order_status', $searchParams['order_status']);
        }

        if ($searchParams['payment_status']) {
            $query->where('payment_status', $searchParams['payment_status']);
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

        $total_orders_count = Order::where('users_email',$email)->count();
        $completed_orders_count = Order::where('users_email',$email)->where('order_status', 'completed')->count();


        $total_spend = Order::where('users_email',$email)->where('payment_status', 'successful')->sum('amount') ?? 0;

//        $total_spend = $paginatedOrders->whereIn('order_status', ['pending', 'successful'])->sum('amount') ?? 0;
//        $pending_orders_count = $paginatedOrders->where('order_status', 'pending')->count();
//        $cancelled_orders_count = $paginatedOrders->where('order_status', 'cancelled')->count();
//        $preview_orders_count = $paginatedOrders->where('order_status', 'preview')->count();

        $pending_orders_count = Order::where('users_email',$email)->where('order_status', 'pending')->count();
        $cancelled_orders_count = Order::where('users_email',$email)->where('order_status', 'cancelled')->count();
        $preview_orders_count = Order::where('users_email',$email)->where('order_status', 'preview')->count();

        $users_phone_no = User::where('email', $email)->first()->phone ?? Order::where('users_email', $email)->first()->users_phone ?? null;

        return response()->json([
            'users_email' => $email,
            'users_phone_no' => $users_phone_no,
            'users_name' => User::where('email', $email)->first()->name ?? "Created by Admin",
            'total_spend' => $total_spend,
            'total_orders_count' => $total_orders_count,
            'pending_orders_count' => $pending_orders_count,
            'cancelled_orders_count' => $cancelled_orders_count,
            'completed_orders_count' => $completed_orders_count,
            'preview_orders_count' => $preview_orders_count,
            'data' => $orders,

        ]);

    }

//    ----------------------------------- Users list and total orders from user side API -----------------------------------


}
