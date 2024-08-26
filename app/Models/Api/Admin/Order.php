<?php

namespace App\Models\Api\Admin;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];


//    ------------------------------------------ Calender timestamp calculation -----------------------------------------

    public static function time_calculation($start_date, $end_date, $query)
    {
        if ($start_date) {
            // Convert start_date and end_date to just the date part
            $startDate = Carbon::parse($start_date)->toDateString();
            $endDate = $end_date ? Carbon::parse($end_date)->toDateString() : $startDate;

            // Add a day's worth of seconds to end_date to make sure we include the whole end_date
            $endDate = Carbon::parse($endDate)->endOfDay();

            $query->whereBetween('created_at', [$startDate, $endDate]);
        }
    }


//    ------------------------------------------ Calender timestamp calculation -----------------------------------------

//    ------------------------------------------ Order ID creation -----------------------------------------

    public static function order_id_creation()
    {
        $day = now()->format('d');
        $month = strtoupper(now()->format('M')); // Get the first two letters of the month in uppercase
        $year = now()->format('y'); // Get the last two digits of the year

        // Get the next order ID (assuming you want the next auto-incremented ID)

        $lastOrder = Order::latest('id')->first();
        $nextId = $lastOrder ? $lastOrder->id + 1 : 1;

        // Pad the order ID to be at least 3 digits
        $paddedId = str_pad($nextId, 3, '0', STR_PAD_LEFT);

        // Combine all components to form the custom order ID
        $customOrderId = $day . substr($month, 0, 2) . $year . $paddedId;

        return $customOrderId;
    }


//    ------------------------------------------ Order ID creation -----------------------------------------

}
