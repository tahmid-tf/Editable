<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function user()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $user,
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }

    }

    public function register(Request $request)
    {


//        ------------------------------------------------- validation block -------------------------------------------------


        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'phone' => 'required',
                'name' => 'required',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------

//        -------------------------------- Rest of the codes --------------------------------


            // Check if the email already exists in the database

            if (User::where('email', $inputs['email'])->exists()) {
                return response([
                    'message' => 'Email already exists'
                ], Response::HTTP_BAD_REQUEST);
            }

            // Check if the phone no already exists in the database

            if (User::where('phone', $inputs['phone'])->exists()) {
                return response([
                    'message' => 'Phone number already exists'
                ], Response::HTTP_BAD_REQUEST);
            }

            $user = User::create([
                'name' => $inputs['name'],
                'email' => $inputs['email'],
                'phone' => $inputs['phone'],
                'password' => Hash::make($inputs['password'])
            ]);

            if (Auth::attempt(['email' => $request->input('email'), 'password' => $request->input('password')])) {
                $user = Auth::user();
                $token = $user->createToken('token')->plainTextToken;
                $cookie = cookie('jwt', $token, 60 * 24 * 30); // 30 days

                return response([
                    'token' => $token,
                    'user' => $user,
                    'status' => Response::HTTP_OK,
                ])->withCookie($cookie);
            }

            return response([
                'message' => 'Invalid Credentials',
                'status' => Response::HTTP_UNAUTHORIZED
            ], Response::HTTP_UNAUTHORIZED);

//        -------------------------------- Rest of the codes --------------------------------


//        ------------------------------------------------- validation block -------------------------------------------------


        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }


//        ------------------------------------------------- validation block -------------------------------------------------


    }

    public function login(Request $request)
    {

        //        ------------------------------------------------- validation block -------------------------------------------------


        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

            //        ------------------------------------------------- validation block -------------------------------------------------


            if (!Auth::attempt($request->only('email', 'password'))) {
                return response([
                    'message' => 'Inavalid Credentials'
                ], Response::HTTP_UNAUTHORIZED);
            };
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('jwt', $token, 60 * 24 * 30); //30days
            return response([
                'token' => $token,
                'user' => $user,
                'status' => Response::HTTP_OK,
            ])->withCookie($cookie);

            //        ------------------------------------------------- validation block -------------------------------------------------


        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }


        //        ------------------------------------------------- validation block -------------------------------------------------


    }


    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'successfully logged out'
        ])->withCookie($cookie);
    }


}
