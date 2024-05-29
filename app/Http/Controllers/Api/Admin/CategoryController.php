<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Api\Admin\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {

        $categories = Category::orderBy('id', 'desc')->paginate(10);

        return response()->json([
            'status' => Response::HTTP_OK,
            'data' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreCategoryRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        //        ------------------------------------------------- validation block -------------------------------------------------


        try {
            $validator = Validator::make($request->all(), [
                'category_name' => 'required|string|max:255',

                'style_price' => 'required|numeric|between:0,999.9999',
                'style_threshold' => 'required|integer|min:0',

                'culling_price' => 'required|numeric|between:0,999.9999',
                'culling_threshold' => 'required|integer|min:0',

                'skin_retouch_price' => 'required|numeric|between:0,999.9999',
                'skin_retouch_threshold' => 'required|integer|min:0',

                'preview_retouch_price' => 'required|numeric|between:0,999.9999',
                'preview_retouch_threshold' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

//        ------------------------------------------------- Rest of the codes ------------------------------------------------


            $category_data = Category::create($inputs);

            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $category_data,
                'message' => "Category data has been created",
            ], 200);

//        ------------------------------------------------- Rest of the codes-------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------

    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Api\Admin\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category_data = Category::find($id);

        if (!$category_data) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'data' => null,
                'message' => "Category data not found",
            ], 404);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'data' => $category_data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Api\Admin\Category $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateCategoryRequest $request
     * @param \App\Models\Api\Admin\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {

        //        ------------------------------------------------- validation block -------------------------------------------------


        try {
            $validator = Validator::make($request->all(), [
                'category_name' => 'required|string|max:255',

                'style_price' => 'required|numeric|between:0,999.9999',
                'style_threshold' => 'required|integer|min:0',

                'culling_price' => 'required|numeric|between:0,999.9999',
                'culling_threshold' => 'required|integer|min:0',

                'skin_retouch_price' => 'required|numeric|between:0,999.9999',
                'skin_retouch_threshold' => 'required|integer|min:0',

                'preview_retouch_price' => 'required|numeric|between:0,999.9999',
                'preview_retouch_threshold' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

//        ------------------------------------------------- Rest of the codes ------------------------------------------------

            $category_data = Category::find($id);

            if (!$category_data) {
                return response()->json([
                    'status' => Response::HTTP_NOT_FOUND,
                    'data' => null,
                    'message' => "Category data not found",
                ], 404);
            }

            $category_data->update($inputs);

            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $category_data,
                'message' => "Category data has been updated",
            ], 200);

//        ------------------------------------------------- Rest of the codes-------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Api\Admin\Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $category_data = Category::find($id);

        if (!$category_data) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'data' => null,
                'message' => "Category data not found",
            ], 404);
        }

        $category_data->delete();

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Category has been deleted',
            'data' => $category_data,
        ]);
    }
}
