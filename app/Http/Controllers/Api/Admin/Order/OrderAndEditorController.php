<?php

namespace App\Http\Controllers\Api\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Category;
use App\Models\Api\Admin\Editor;
use App\Models\Api\Admin\Order;
use App\Models\Api\Admin\Style;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
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

    // --------------------------- Assign editors to order table ---------------------------


    public function assign_editor(Request $request)
    {

//        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [
                'editor_id' => 'required|integer',
                'order_id' => 'required|integer',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

            // --------------------------- Assign editors to order table ---------------------------

            $editor_id = $inputs['editor_id'];
            $order_id = $inputs['order_id'];


            $editor = Editor::find($editor_id);
            $order = Order::find($order_id);


            if (!$editor) {
                return response()->json([
                    'data' => 'Editor data not found',
                    'status' => Response::HTTP_NOT_FOUND,
                ]);
            }

            if (!$order) {
                return response()->json([
                    'data' => 'Order data not found',
                    'status' => Response::HTTP_NOT_FOUND,
                ]);
            }

            $order->where('id', $order_id)->update(['editors_id' => $editor_id]);

            return response()->json([
                'message' => 'Editor successfully assigned to current order',
                'status' => Response::HTTP_OK,
                'editor_info' => $editor->editor_name ?? null,
            ]);


            // --------------------------- Assign editors to order table ---------------------------


//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------


    }
}
