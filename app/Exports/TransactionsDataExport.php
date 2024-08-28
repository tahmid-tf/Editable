<?php

namespace App\Exports;

use App\Models\Api\Admin\Order;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;


class TransactionsDataExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{
    /**
     * @return Collection
     */

    use Exportable;

    protected $searchParams;

    public function __construct(array $searchParams)
    {
        $this->searchParams = $searchParams;
    }


    public function query()
    {
        $query = Order::query();

        if (!empty($this->searchParams['email'])) {
//            $query->where('users_email', 'LIKE', '%' . $this->searchParams['email'] . '%');

//        -------------------------- dynamic column mapping --------------------------

            $searchParams = $this->searchParams;

            $query->where(function ($q) use ($searchParams) {
                $q->where('users_email', 'LIKE', '%' . $searchParams['email'] . '%')
                    ->orWhere('order_id', 'LIKE', '%' . $searchParams['email'] . '%');
            });

//        -------------------------- dynamic column mapping --------------------------

        }



        if (!empty($this->searchParams['order_status'])) {
            $query->where('order_status', $this->searchParams['order_status']);
        }

        if (!empty($this->searchParams['payment_status'])) {
            $query->where('payment_status', $this->searchParams['payment_status']);
        }

        if (!empty($this->searchParams['start_date'])) {
            $end_date = $this->searchParams['end_date'] ?: $this->searchParams['start_date'];
            $query->whereBetween('created_at', [$this->searchParams['start_date'], $end_date]);
        }

        $query->select('users_email', 'order_status', 'payment_status', 'created_at');

        return $query;
    }

    public function headings(): array
    {
        return [
            'User Email',
            'Order Status',
            'Payment Status',
            'Order Date',
        ];
    }

    public function map($order): array
    {
        return [
            $order->users_email,
            $order->order_status,
            $order->payment_status,
            \Carbon\Carbon::parse($order->created_at)->format('d-M-Y'), // Format the date
        ];
    }

}
