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


    public function users_data_modified(Request $request)
    {
        $email = $request->input('email');
        $paginate = $request->input('paginate', 10);  // Default pagination is 10

// Base query to select distinct emails
        $query = Order::select('users_email')->distinct();

        if ($email) {
            // Filter by email if provided
            $query->where('users_email', 'like', '%' . $email . '%')
                ->orWhere('users_name', 'like', '%' . $email . '%')
                ->orWhere('users_phone', 'like', '%' . $email . '%');
        }

// Get all distinct emails
        $distinctEmails = $query->get();

// Manually paginate the distinct results
        $page = $request->input('page', 1);
        $total = $distinctEmails->count();
        $users = $distinctEmails->forPage($page, $paginate);

// Convert the paginated result to array
        $data = $users->values()->toArray();

// Add additional user details (users_name, users_phone, total_order_count)
        foreach ($data as &$order) {
            $users_email = $order['users_email'];

            $order['users_name'] = Order::where('users_email', $users_email)->first()->users_name ?? null;
            $order['users_phone'] = Order::where('users_email', $users_email)->first()->users_phone ?? null;
            $order['total_order_count'] = Order::where('users_email', $users_email)->whereIn('payment_status', ['pending', 'successful', 'cancelled'])->count() ?? 0;
        }

// Manually construct the pagination data
        $pagination = [
            'current_page' => $page,
            'data' => $data,  // Paginated distinct emails with additional fields
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


    public function users_data(Request $request)
    {
        $search = $request->input('email');
        $query = Order::select('users_email')->distinct();

        if ($search) {
            $query->where('users_email', 'like', '%' . $search . '%')
                ->orWhere('users_name', 'like', '%' . $search . '%')
                ->orWhere('users_phone', 'like', '%' . $search . '%');
        }

        $paginate = request('paginate', 10);
        $users = $query->paginate($paginate);

        $data = $users->toArray();


//  -------------------------------------------- users_name, users_phone, total_order_count additionally added --------------------------------------------------


        foreach ($data['data'] as &$order) {

            $users_email = $order['users_email'];

            $order['users_name'] = Order::where('users_email', $users_email)->first()->users_name ?? null;

//            ----------------- users name search and checking if registered by users -----------------

            $order['users_phone'] = Order::where('users_email', $users_email)->first()->users_phone ?? null;
            $order['total_order_count'] = Order::where('users_email', $users_email)->whereIn('payment_status', ['pending', 'successful'])->count() ?? 0;
        }


//  ------------------------------------------------------------- Total ordered users count -----------------------------------------------------------------------

        $total_ordered_user_count = Order::select('users_email')->distinct()->count() ?? 0;

//  ------------------------------------------------------------- Total ordered users count -----------------------------------------------------------------------

//  ------------------------------------------------------------- Total numbers of base style and additional style count -----------------------------------------------------------------------

        $base_style_count = Style::where('additional_style', 'no')->count() ?? 0;
        $additional_style_count = Style::where('additional_style', 'yes')->count() ?? 0;

//  ------------------------------------------------------------- Total numbers of base style and additional style count -----------------------------------------------------------------------

        return response()->json([
            'total_ordered_user_count' => $total_ordered_user_count,
            'base_style_count' => $base_style_count,
            'additional_style_count' => $additional_style_count,
            'data' => $data
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
            'editor' => request('editor'),
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

        if ($searchParams['editor']) {

            $query->where('editors_id', $searchParams['editor']);


//            $editor = Editor::withTrashed()->where('editor_name', 'LIKE', '%' . $searchParams['editor'] . '%')->first();
//            if ($editor) {
//                $query->where('editors_id', $editor->id);
//            } else {
//                // If no editor is found, set the query to return no results
//                $query->whereNull('editors_id');
//            }
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
