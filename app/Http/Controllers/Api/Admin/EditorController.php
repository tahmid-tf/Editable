<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Editor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class EditorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $editors = Editor::all();
        return response()->json([
            'data' => $editors,
            'status' => Response::HTTP_OK,
        ], Response::HTTP_OK);
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
                'editor_name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

            $editorName = $request->input('editor_name'); // Get the editor name from the request

            // Check if an editor with the same name already exists
            $existingEditor = Editor::where('editor_name', $editorName)->first();

            if ($existingEditor) {
                // Editor already exists, return appropriate response
                return response()->json([
                    'status' => 'error',
                    'message' => "Editor name '$editorName' already exists",
                ], 422); // Use status code 422 for Unprocessable Entity
            }

            // If editor doesn't exist, proceed with creation
            $editor = Editor::create($request->all());

            return response()->json([
                'status' => 'success',
                'data' => $editor,
                'message' => "Editor data has been created",
            ], 200); // Use status code 201 for Created


//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------


    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Api\Admin\Editor $editor
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $editor_data = Editor::find($id);

        if (!$editor_data) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'data' => null,
                'message' => "Editor data not found",
            ], 404);
        }

        return response()->json([
            'status' => Response::HTTP_OK,
            'data' => $editor_data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Api\Admin\Editor $editor
     * @return \Illuminate\Http\Response
     */
    public function edit(Editor $editor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Api\Admin\Editor $editor
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $editorId)
    {
        //        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [
                'editor_name' => 'required|string|max:255',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

            $editorName = $request->input('editor_name');

            // Fetch the editor to be updated
            $editor = Editor::find($editorId);

            if (!$editor) {
                // Editor not found, return appropriate response
                return response()->json([
                    'status' => 'error',
                    'message' => "Editor with ID $editorId not found",
                ], 404); // Use status code 404 for Not Found
            }

            // Check if editor name already exists (excluding current editor)
            $existingEditor = Editor::where('editor_name', $editorName)
                ->where('id', '!=', $editor->id) // Exclude current editor
                ->first();

            if ($existingEditor) {
                // Editor name already exists with another editor, return warning
                return response()->json([
                    'status' => 'error',
                    'message' => "Editor name '$editorName' already exists",
                ], 422); // Use status code 422 for Unprocessable Entity
            }

            // Update the editor if no conflicts
            $editor->update($request->all());

            return response()->json([
                'status' => 'success',
                'data' => $editor,
                'message' => "Editor data has been updated",
            ], 200);


//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Api\Admin\Editor $editor
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $editor_data = Editor::find($id);

        if (!$editor_data) {
            return response()->json([
                'status' => Response::HTTP_NOT_FOUND,
                'data' => null,
                'message' => "Editor data not found",
            ], 404);
        }

        $editor_data->delete();

        return response()->json([
            'status' => Response::HTTP_OK,
            'message' => 'Editor has been deleted',
            'data' => $editor_data,
        ]);
    }
}
