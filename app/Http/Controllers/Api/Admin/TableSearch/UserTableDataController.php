<?php

namespace App\Http\Controllers\Api\Admin\TableSearch;

use App\Exports\TransactionsDataExport;
use App\Exports\UsersDataExport;
use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Order;
use App\Models\Api\Admin\Style;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Maatwebsite\Excel\Facades\Excel;

class UserTableDataController extends Controller
{


//    ----------------------------------- Users list and total orders from admin side API [v4] -----------------------------------


    public function users_data(Request $request)
    {
        $search = $request->input('email');  // Single search parameter
        $paginate = $request->input('paginate', 10);  // Default pagination is 10

// Base query to select distinct emails
        $query = Order::select('users_email')->distinct();

        if ($search) {
            // Filter by users_email, users_name, or users_phone based on the search term
            $query->where(function ($query) use ($search) {
                $query->where('users_email', 'like', '%' . $search . '%')
                    ->orWhere('users_name', 'like', '%' . $search . '%')
                    ->orWhere('users_phone', 'like', '%' . $search . '%');
            });
        }

// Get all distinct emails
        $distinctEmails = $query->get();

// Manually paginate the distinct results
        $page = $request->input('page', 1);
        $total = $distinctEmails->count();
        $users = $distinctEmails->forPage($page, $paginate);

// Convert the paginated result to array
        $data = $users->values()->toArray();

// Add additional user details
        foreach ($data as &$order) {
            $users_email = $order['users_email'];

            // Initialize default values
            $order['users_name'] = null;
            $order['users_phone'] = null;
            $order['total_order_count'] = 0;

            // Check if the user is registered
            if (User::where('email', $users_email)->exists()) {
                $order['users_name'] = User::where('email', $users_email)->first()->name ?? null;
            } else {
                $order['users_name'] = Order::where('users_email', $users_email)->first()->users_name ?? null;
            }

            // Add user phone and total order count
            $order['users_phone'] = Order::where('users_email', $users_email)->first()->users_phone ?? null;
            $order['total_order_count'] = Order::where('users_email', $users_email)
                ->whereIn('payment_status', ['pending', 'successful'])
                ->count() ?? 0;
        }

// Manually construct the pagination data based on the results
        $pagination = [
            'current_page' => $page,
            'data' => $data,  // Paginated results
            'first_page_url' => url()->current() . '?page=1',
            'from' => $users->isEmpty() ? 0 : (($page - 1) * $paginate) + 1,
            'last_page' => ceil($total / $paginate),
            'last_page_url' => url()->current() . '?page=' . ceil($total / $paginate),
            'next_page_url' => $page < ceil($total / $paginate) ? url()->current() . '?page=' . ($page + 1) : null,
            'path' => url()->current(),
            'per_page' => $paginate,
            'prev_page_url' => $page > 1 ? url()->current() . '?page=' . ($page - 1) : null,
            'to' => $users->isEmpty() ? 0 : (($page - 1) * $paginate) + $users->count(),
            'total' => $total,
        ];

// Calculate total ordered users count, base style count, and additional style count
        $total_ordered_user_count = Order::select('users_email')->distinct()->count() ?? 0;
        $base_style_count = Style::where('additional_style', 'no')->count() ?? 0;
        $additional_style_count = Style::where('additional_style', 'yes')->count() ?? 0;

// Return the response with the additional data
        return response()->json([
            'total_ordered_user_count' => $total_ordered_user_count,
            'base_style_count' => $base_style_count,
            'additional_style_count' => $additional_style_count,
            'data' => $pagination
        ]);

    }

//    ----------------------------------- Users list and total orders from admin side API [v4] -----------------------------------

//    ----------------------------------- Users list export from admin side API -----------------------------------

    public function ordered_users_data_export()
    {
        return Excel::download(new UsersDataExport(), 'users_data.xlsx');

    }


//    ----------------------------------- Users list export from admin side API -----------------------------------

//    ----------------------------------- Users list and total orders from admin side API -----------------------------------

    public function single_user_data($email)
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

        $query->where('users_email', $email);

        if ($searchParams['order_id']) {
            $query->where('order_id', $searchParams['order_id']);
        }

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
        $total_orders_count = $paginatedOrders->count();
        $completed_orders_count = $paginatedOrders->where('order_status', 'completed')->count();

        $total_spend = $paginatedOrders->whereIn('order_status', ['pending', 'successful'])->sum('amount') ?? 0;

        $pending_orders_count = $paginatedOrders->where('order_status', 'pending')->count();
        $cancelled_orders_count = $paginatedOrders->where('order_status', 'cancelled')->count();
        $preview_orders_count = $paginatedOrders->where('order_status', 'preview')->count();

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

//    ----------------------------------- Users list and total orders from admin side API -----------------------------------


}
