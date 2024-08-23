<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Style;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FindingStylesController extends Controller
{
    public function general_info_and_category(Request $request)
    {

        //        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
                'order_type' => 'required|string|max:255',
                'order_name' => 'required|string|max:255',
                'category' => 'required|integer|max:255',
                'payment_status' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

//        ------------------------------------------------- Category block -------------------------------------------------


            $category = Category::find($inputs['category']);

            if (!$category) {
                return response()->json([
                    "data" => 'Category not found',
                    "status" => 404,
                ]);
            } else {
                $inputs['category_data'] = $category;
            }

//        ------------------------------------------------- Category block -------------------------------------------------


//        ------------------------------------------------- Finding style based on category -------------------------------------------------


            $styles = Style::whereJsonContains('categories', (int) $inputs['category'])->get();

            if ($styles->isEmpty()) {
                return response()->json([
                    "data" => 'No styles found for the given category',
                ], 404);
            }


            $inputs['style_data'] = $styles;

            return response()->json([
                "data" => $inputs,
                "status" => 200,
            ]);


//        ------------------------------------------------- Finding style based on category -------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------


    }

    public function general_info_and_category_from_user(Request $request)
    {
        //        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [
                'order_type' => 'required|string|max:255',
                'order_name' => 'required|string|max:255',
                'category' => 'required|integer',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

//        ------------------------------------------------- Category block -------------------------------------------------


            $category = Category::find($inputs['category']);


            if (!$category) {
                return response()->json([
                    "data" => 'Category not found',
                    "status" => 404,
                ]);
            } else {
                $inputs['category_data'] = $category;
            }

//        ------------------------------------------------- Category block -------------------------------------------------

//        ------------------------------------------------- Finding style based on category -------------------------------------------------


            $styles = Style::whereJsonContains('categories', (int) $inputs['category'])->get();

            if ($styles->isEmpty()) {
                return response()->json([
                    "data" => 'No styles found for the given category',
                ], 404);
            }

            // Transform the styles collection
//            $styles = $styles->map(function($style) {
//                $style->upload_image = asset('storage/' . $style->upload_image);
//                return $style;
//            });

            $inputs['style_data'] = $styles;

            return response()->json([
                "data" => $inputs,
                "status" => 200,
            ]);


//        ------------------------------------------------- Finding style based on category -------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

        //        ------------------------------------------------- validation block -------------------------------------------------
    }
}
