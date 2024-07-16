<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Order;
use App\Models\Api\Admin\Style;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class OrderAndEditorController extends Controller
{
    public function view($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'data' => 'Invalid request',
            ], Response::HTTP_NOT_FOUND);
        }

        $stylesArray = json_decode($order['styles_array'], true);
        $style_data = Style::withTrashed()->whereIn('id', $stylesArray)->get() ?? [];
        $order->category_name = Category::withTrashed()->find($order['category_id'])->category_name ?? null;

        $order->styles_data = $style_data;


        return response()->json([
            'status' => Response::HTTP_OK,
            'data' => $order,
        ], Response::HTTP_OK);

    }
}
