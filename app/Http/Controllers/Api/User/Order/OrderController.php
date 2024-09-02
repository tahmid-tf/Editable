<?php

namespace App\Http\Controllers\Api\User\Order;

use App\Http\Controllers\Controller;
use App\Models\Api\Admin\Order;
use App\Models\PreviewEdit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        //        ------------------------------------------------- validation block -------------------------------------------------


        try {
            $validator = Validator::make($request->all(), [

                //payment gateway block
                'amount' => 'required|integer',
                'number' => 'required|integer',
                'exp_month' => 'required|string',
                'exp_year' => 'required|string',
                'cvc' => 'required|string',

                //other blocks

                'order_type' => 'required|in:standard,express,custom',
                'order_name' => 'required|string',
                'category_id' => 'required|integer',


                'file_uploaded_by_user' => 'required|string',


                'styles_array' => 'required|json',
                'number_of_images_provided' => 'required|integer',
                'culling' => 'nullable|in:yes,no',
                'images_culled_down_to' => 'nullable|string',
                'select_image_culling_type' => 'nullable|string',
                'skin_retouching' => 'nullable|in:yes,no',
                'skin_retouching_type' => 'nullable|string',
                'additional_info' => 'nullable|in:yes,no',
                'preview_edits' => 'nullable|in:yes,no',

            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

            //        ---------- If order name already exists with this account -----------

            if (Order::where('order_name', $inputs['order_name'])
                ->where('users_email', auth()->user()->email)
                ->exists()) {

                return response()->json([
                    'message' => 'Order with this name already exists.',
                    'status' => 409,
                ], 409); // 409 Conflict HTTP status code
            }

            //        ---------- If order name already exists with this account -----------


//        ------------------------------------------------- validation block -------------------------------------------------

//        -------------------------------------------------------------------------------------- code block ------------------------------------------------------------------------------------------


            //without preview edits

            $inputs['user_id'] = auth()->id();
            $inputs['users_email'] = auth()->user()->email;
            $inputs['users_phone'] = auth()->user()->phone;
            $inputs['users_name'] = auth()->user()->name;
            $inputs['payment_status'] = "successful";
            $inputs['order_status'] = "pending";

            //without preview edits


//            ------------- if the order has preview edits with it ----------------

            if ($inputs['preview_edits'] == "no") {
                $inputs['preview_edit_status'] = "no";
            } else {
                $inputs['preview_edit_status'] = "pending";
            }

//            ------------- if the order has preview edits with it  ----------------



            // stripe payment gateway block

            try {

                $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

//                $res = $stripe->tokens->create([
//                    'card' => [
//                        'number' => $inputs['number'],
//                        'exp_month' => $inputs['exp_month'],
//                        'exp_year' => $inputs['exp_year'],
//                        'cvc' => $inputs['cvc'],
//                    ],
//                ]);

                \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));


                $resp1 = $stripe->charges->create([
                    'amount' => intval($request['amount']) * 100,
                    'currency' => 'usd',
                    'source' => 'tok_visa',
                ]);


                if ($resp1->status == "succeeded") {

//            ----------------------------- storing order block if payment is successful -----------------------------

                    $order = Order::create([
                        'user_id' => $inputs['user_id'],
                        'users_email' => $inputs['users_email'],
                        'users_phone' => $inputs['users_phone'],
                        'users_name' => $inputs['users_name'],
                        'payment_status' => $inputs['payment_status'],
                        'order_status' => $inputs['order_status'],

                        'amount' => $inputs['amount'],
                        'order_type' => $inputs['order_type'],
                        'order_name' => $inputs['order_name'],
                        'category_id' => $inputs['category_id'],
                        'file_uploaded_by_user' => $inputs['file_uploaded_by_user'] ?? null,

                        'styles_array' => $inputs['styles_array'],
                        'number_of_images_provided' => $inputs['number_of_images_provided'],
                        'culling' => $inputs['culling'] ?? null,
                        'images_culled_down_to' => $inputs['images_culled_down_to'] ?? null,
                        'select_image_culling_type' => $inputs['select_image_culling_type'] ?? null,
                        'skin_retouching' => $inputs['skin_retouching'] ?? null,
                        'skin_retouching_type' => $inputs['skin_retouching_type'] ?? null,
                        'additional_info' => $inputs['additional_info'] ?? null,

                        'preview_edits' => $inputs['preview_edits'],
                        'preview_edit_status' => $inputs['preview_edit_status'],
                    ]);

//            ------------- order id creation and initiating order_id ----------------

                    $order['order_id'] = Order::order_id_creation();
                    $order->save();

//            ------------- order id creation and initiating order_id ----------------

//            ------------- if the order has preview edits with it , adding columns to PreviewEdit model ----------------


                    if ($order->preview_edits == "yes") {
                        PreviewEdit::create([
                            'order_id' => $order->id,
                        ]);

                    }

//            ------------- if the order has preview edits with it , adding columns to PreviewEdit model ----------------

                    return response()->json([
                        'data' => $order,
                        'message' => 'Order created successfully.',
                        'status' => 200
                    ], 200);

//            ----------------------------- storing order block if payment is successful -----------------------------


                } else {
                    return response()->json([
                        'response' => $resp1->status, // if failed
                        'status' => 400, // Bad request or any other appropriate status code
                        'message' => 'Payment failed. Please try again.', // Custom error message
                    ], 400);
                }


            } catch (\Exception $ex) {
                return response()->json([
                    'response' => 'error',
                    'message' => $ex->getMessage(),
                ], 500);
            }


//        -------------------------------------------------------------------------------------- code block ------------------------------------------------------------------------------------------

//        ------------------------------------------------- validation block -------------------------------------------------

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }

//        ------------------------------------------------- validation block -------------------------------------------------

    }
}
