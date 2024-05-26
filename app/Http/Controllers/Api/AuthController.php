<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function user()
    {
        return Auth::user();
    }

    public function register(Request $request)
    {
        $inputs['email'] = $request->input('email');
        $inputs['phone'] = $request->input('phone');
        $inputs['name'] = $request->input('name');
        $inputs['password'] = $request->input('password');

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

        if (Auth::attempt(['phone' => $request->input('phone'), 'password' => $request->input('password')])) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('jwt', $token, 60 * 24 * 30); // 30 days

            return response([
                'token' => $token,
                'user' => $user,
            ])->withCookie($cookie);
        }

        return response([
            'message' => 'Invalid Credentials'
        ], Response::HTTP_UNAUTHORIZED);

    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Inavalid Credentials'
            ], Response::HTTP_UNAUTHORIZED);
        };
        $user = Auth::user();
        $token = $user->createToken('token')->plainTextToken;
        $cookie = cookie('jwt',$token,60*24*30); //30days
        return response([
            'message' => $token
        ])->withCookie($cookie);

    }


    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'success'
        ])->withCookie($cookie);
    }


}
