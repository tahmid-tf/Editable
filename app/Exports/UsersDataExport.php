<?php

namespace App\Exports;

use App\Models\Api\Admin\Order;
use App\Models\User;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class UsersDataExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{

//    ----------------------------- From order table, finding and filtering unique emails -----------------------------

    public function query()
    {
        return Order::select('users_email')->distinct();
    }

//    ----------------------------- From order table, finding and filtering unique emails -----------------------------

//    ----------------------------- Filtering from Users table if the users exists and mapping it  -----------------------------


    /**
     * @var Order $order
     */

    public function map($order): array
    {
        $users_email = $order->users_email;

        // Determine the user's name
        if (User::where('email', $users_email)->exists()) {
            $users_name = User::where('email', $users_email)->first()->name ?? null;
        } else {
            $users_name = Order::where('users_email', $users_email)->first()->users_name ?? null;
        }

        // Get user's phone number
        $users_phone = Order::where('users_email', $users_email)->first()->users_phone ?? null;

        // Calculate the total order count
        $total_order_count = Order::where('users_email', $users_email)
            ->whereIn('payment_status', ['pending', 'successful'])
            ->count() ?? 0;

        return [
            $users_email,
            $users_name,
            $users_phone,
            $total_order_count
        ];
    }

//    ----------------------------- Filtering from Users table if the users exists and mapping it  -----------------------------

//    ----------------------------- Headers data -----------------------------

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'User Email',
            'User Name',
            'Users Phone Number',
            'Total Order Count'
        ];
    }

//    ----------------------------- Headers data -----------------------------


}
