<?php

namespace App\Http\Controllers\Api\Admin\TableSearch;

use App\Exports\TransactionsDataExport;
use App\Exports\UsersDataExport;
use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Order;
use App\Models\Api\Admin\Style;
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

        $users = $query->paginate(10);

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

        $base_style_count = Style::where('additional_style','no')->count() ?? 0;
        $additional_style_count = Style::where('additional_style','yes')->count() ?? 0;

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


}
