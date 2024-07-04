<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Style;
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

                'styles_array' => 'required|array',
                'styles_array.*' => 'integer',
                'category_id' => 'required|integer',

            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

            $category = Category::find($inputs['category_id']);

            if (!$category) {
                return response()->json([
                    'message' => 'Category not found',
                    'status' => 404
                ]);
            }

            $styles = Style::whereIn('id', $inputs['styles_array'])->get();

            $culling = "yes";
            $skin_retouch = "yes";
            $preview_edits = "yes";

            foreach ($styles as $style) {
                if ($style->culling == "no")
                    $culling = "no";

                if ($style->skin_retouch == "no")
                    $skin_retouch = "no";

                if ($style->preview_edits == "no")
                    $preview_edits = "no";
            }

//            ------------------------------------------- Threshold calculation -------------------------------------------

            // Initial thresholds array with the always included style_threshold
            $thresholds = [
                'style_threshold' => $category->style_threshold
            ];

            // Check and include the relevant thresholds
            if ($culling === 'yes') {
                $thresholds['culling_threshold'] = $category->culling_threshold;
            }

            if ($skin_retouch === 'yes') {
                $thresholds['skin_retouch_threshold'] = $category->skin_retouch_threshold;
            }

            if ($preview_edits === 'yes') {
                $thresholds['preview_edit_threshold'] = $category->preview_edit_threshold;
            }

            // Find the maximum threshold and its name
            $max_threshold_value = max($thresholds);
            $max_threshold_name = array_search($max_threshold_value, $thresholds);

//            ------------------------------------------- Threshold calculation -------------------------------------------

            return response()->json([
                'category' => $category,
                'max_threshold_value' => $max_threshold_value,
                'max_threshold_name' => $max_threshold_name,
                'culling' => $culling,
                'skin_retouch' => $skin_retouch,
                'preview_edits' => $preview_edits,
//                'styles' => $styles,

            ]);

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------


    }
}
