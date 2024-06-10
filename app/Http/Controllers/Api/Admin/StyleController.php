<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Style;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation;

class StyleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $styles = Style::all()->toArray(); // Fetch all styles and convert to array

        foreach ($styles as &$style) {
            // Decode the categories JSON string to array
            $categoryIds = json_decode($style['categories'], true);

            // Fetch categories details
            $categories = Category::whereIn('id', $categoryIds)->get();

            // Append category details to the style
            $style['category_details'] = $categories;

            // Convert the upload_image field to asset format
            $style['upload_image'] = asset('storage/' . $style['upload_image']);
        }

        return response()->json([
            'data' => $styles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

//        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [
                'style_name' => 'required',
                'description' => 'required',
                'upload_image' => 'required',
                'categories' => 'required|array',
                'categories.*' => 'integer',
                'additional_style' => 'required',
                'culling' => 'required',
                'skin_retouch' => 'required',
                'preview_edits' => 'required',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------


//            -------------------------- validating categories based on array data --------------------------

            // Assuming 'categories' is an array of IDs from the input
            $category_array_data = $inputs['categories'];

            // Manual uniqueness check
            if (count($category_array_data) !== count(array_unique($category_array_data))) {
                return response()->json([
                    'message' => 'Categories array contains duplicate values'
                ], 422);
            }

            // Find categories by the given IDs
            $categories = Category::whereIn('id', $category_array_data)->get();


            // Extract the IDs of the found categories
            $foundCategoryIds = $categories->pluck('id')->toArray();

            // Determine the missing IDs
            $missingIds = array_diff($category_array_data, $foundCategoryIds);

            // Check if there are any missing IDs
            if (!empty($missingIds)) {
                return response()->json([
                    'message' => 'Some categories were not found',
                    'missing_ids' => $missingIds
                ], 404);
            }

//            -------------------------- validating categories based on array data --------------------------

//            -------------------------- fetching the style image and decoding array --------------------------

            if ($request->hasFile('upload_image')) {
                $inputs['upload_image'] = $request->file('upload_image')->store('images');
            }

            $inputs['categories'] = json_encode($category_array_data);

//            -------------------------- fetching the style image and decoding array --------------------------


//            -------------------------- saving the data --------------------------

            $style_creation = Style::create($inputs);

            return response()->json([
                'message' => 'Style created successfully',
                'data' => $style_creation,
                'status_code' => \Symfony\Component\HttpFoundation\Response::HTTP_OK
            ]);

//            -------------------------- saving the data --------------------------


//        ------------------------------------------------- validation block -------------------------------------------------


        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Api\Admin\Style $style
     * @return \Illuminate\Http\Response
     */
    public function show(Style $style)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Api\Admin\Style $style
     * @return \Illuminate\Http\Response
     */
    public function edit(Style $style)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Api\Admin\Style $style
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Style $style)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Api\Admin\Style $style
     * @return \Illuminate\Http\Response
     */
    public function destroy(Style $style)
    {
        //
    }
}
