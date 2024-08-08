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

//    ----------------------------------- Users list and total orders from admin side API -----------------------------------


    public function users_data(Request $request)
    {

        $email = $request->input('email');
        $query = Order::select('users_email')->distinct();

        if ($email) {
            $query->where('users_email', 'like', '%' . $email . '%');
        }

        $paginate = request('paginate', 10);
        $users = $query->paginate($paginate);

        $data = $users->toArray();


//  -------------------------------------------- users_name, users_phone, total_order_count additionally added --------------------------------------------------


        foreach ($data['data'] as &$order) {

            $users_email = $order['users_email'];

//            ----------------- users name search and checking if registered by users -----------------

            if (User::where('email', $users_email)->exists()) {
                $order['users_name'] = User::where('email', $users_email)->first()->name ?? null;
            } else {
                $order['users_name'] = Order::where('users_email', $users_email)->first()->users_name ?? null;
            }

//            ----------------- users name search and checking if registered by users -----------------

            $order['users_phone'] = Order::where('users_email', $users_email)->first()->users_phone ?? null;
            $order['total_order_count'] = Order::where('users_email', $users_email)->whereIn('payment_status', ['pending', 'successful'])->count() ?? 0;
        }

//  -------------------------------------------- users_name, users_phone, total_order_count additionally added ----------------------------------------------------

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

//    ----------------------------------- Users list and total orders from admin side API -----------------------------------

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
            $query->where('id', $searchParams['order_id']);
        }

        if ($searchParams['order_status']) {
            $query->where('order_status', $searchParams['order_status']);
        }

        if ($searchParams['payment_status']) {
            $query->where('payment_status', $searchParams['payment_status']);
        }


//        ---------------------------- between start data and end date modification ----------------------------

        if ($searchParams['start_date']) {
            $end_date = $searchParams['end_date'] ?: $searchParams['start_date'];
            $query->whereBetween('created_at', [$searchParams['start_date'], $end_date]);
        }

//        if ($searchParams['start_date']) {
//            // Convert start_date and end_date to just the date part
//            $startDate = Carbon::parse($searchParams['start_date'])->toDateString();
//            $endDate = $searchParams['end_date'] ? Carbon::parse($searchParams['end_date'])->toDateString() : $startDate;
//
//            // Add a day's worth of seconds to end_date to make sure we include the whole end_date
//            $endDate = Carbon::parse($endDate)->endOfDay();
//
//            $query->whereBetween('created_at', [$startDate, $endDate]);
//        }

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
