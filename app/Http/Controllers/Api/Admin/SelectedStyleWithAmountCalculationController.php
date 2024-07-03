<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SelectedStyleWithAmountCalculationController extends Controller
{
    public function amount(Request $request)
    {
        return response()->json([
            'data' => 'working'
        ]);
    }
}
