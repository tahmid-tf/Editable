<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SelectedStyleWithAmountCalculationController extends Controller
{
    public function amount(Request $request)
    {

//        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [

                'styles_array' => 'nullable|array',
                'styles_array.*' => 'integer',
                'category_id' => 'required|integer',
                'delivery_type' => 'required|in:standard,express,custom',

            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------


    }
}
