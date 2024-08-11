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

}
