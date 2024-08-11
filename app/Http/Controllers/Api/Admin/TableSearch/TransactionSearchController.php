<?php

namespace App\Http\Controllers\Api\Admin\TableSearch;

use App\Exports\TransactionsDataExport;
use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class TransactionSearchController extends Controller
{

// -------------------------- Transaction list from admin side --------------------------

    public function transaction(Request $request)
    {

        $query = Order::query();

        $searchParams = [
            'email' => request('email'),
            'order_status' => request('order_status'),
            'payment_status' => request('payment_status'),
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


//        ---------------------------- between start data and end date modification ----------------------------

//        if ($searchParams['start_date']) {
//            $end_date = $searchParams['end_date'] ?: $searchParams['start_date'];
//            $query->whereBetween('created_at', [$searchParams['start_date'], $end_date]);
//        }

        Order::time_calculation($searchParams['start_date'], $searchParams['end_date'], $query);


//        ---------------------------- between start data and end date modification ----------------------------

        $paginate = request('paginate', 10);
        $orders = $query->select('id', 'users_email', 'order_status', 'payment_status', 'created_at')->orderBy('created_at', 'desc')->paginate($paginate);

//        ----------------------- Transaction id and Order id -----------------------

        $data = $orders->toArray();
        foreach ($data['data'] as &$additional_data) {
            $additional_data['transaction_id'] = $additional_data['id'];
            $additional_data['order_id'] = $additional_data['id'];
        }

//        ----------------------- Transaction id and Order id -----------------------


        // Count values based on the paginated results
        $paginatedOrders = $orders->getCollection();


        $total_transactions = Order::count();
        $successful_transactions = Order::where('payment_status', 'successful')->count();
        $total_successful_amount = Order::where('payment_status', 'successful')->sum('amount') ?? 0;


        return response()->json([
            'total_transactions' => $total_transactions,
            'successful_transactions' => $successful_transactions,
            'total_successful_transaction_amount' => $total_successful_amount,
            'data' => $data,
        ]);
    }

// -------------------------- Transaction list from admin side --------------------------

// -------------------------- Transaction data export --------------------------

    public function transactions_data_export(Request $request)
    {
        $searchParams = [
            'email' => $request->input('email'),
            'order_status' => $request->input('order_status'),
            'payment_status' => $request->input('payment_status'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        return Excel::download(new TransactionsDataExport($searchParams), 'transactions.xlsx');
    }


// -------------------------- Transaction data export --------------------------

}
