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

    // --------------------------- Single order Information ---------------------------


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

    // --------------------------- Single order Information ---------------------------


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

    // --------------------------- Assign editors to order table ---------------------------

    // --------------------------- Order status pending, cancelled status setup routes ---------------------------

    public function set_order_status()
    {
        $order_id = request()->input('order_id');
        $order_status = request()->input('order_status');

//        --------------------- checking validated list ---------------------

        $order = Order::find($order_id);

        if (!$order) {
            return response()->json([
                'data' => 'Order data not found',
                'status' => Response::HTTP_NOT_FOUND,
            ]);
        }

        $validated_list = ['pending','cancelled'];

        if (!in_array($order_status, $validated_list)) {
            return response()->json([
                'data' => 'Invalid order status request',
                'status' => Response::HTTP_NOT_FOUND,
            ]);
        }

//        --------------------- checking validated list ---------------------

        $order->order_status = $order_status;
        $order->save();

        return response()->json([
            'data' => 'Order status successfully updated',
            'status' => Response::HTTP_OK,
        ]);

    }

    // --------------------------- Order status pending, cancelled status setup routes ---------------------------

    // --------------------------- Order complete by admin, drive link update ---------------------------
    public function complete_order()
    {
        $order_id = request()->input('order_id');
        $order_status = request()->input('order_status');
        $uploaded_drive_link = request()->input('uploaded_drive_link');

//        --------------------- checking validations ---------------------

        $order = Order::find($order_id);

        if (!$order) {
            return response()->json([
                'data' => 'Order data not found',
                'status' => Response::HTTP_NOT_FOUND,
            ]);
        }

        $validated_list = ['completed'];

        if (!in_array($order_status, $validated_list)) {
            return response()->json([
                'data' => 'Invalid order status request',
                'status' => Response::HTTP_NOT_FOUND,
            ]);
        }

        if (!$uploaded_drive_link) {

            return response()->json([
                'data' => 'Uploaded drive link value cannot be null',
                'status' => Response::HTTP_NOT_FOUND,
            ]);
        }

//        --------------------- checking validations ---------------------

        $order->order_status = $order_status;
        $order->file_uploaded_by_user = $uploaded_drive_link;
        $order->order_delivery_date = now();
        $order->save();



        return \response()->json([
            'data' => 'Order status successfully completed',
            'status' => Response::HTTP_OK,
            'order' => $order,
        ]);
    }

    // --------------------------- Order complete by admin, drive link update ---------------------------



}
