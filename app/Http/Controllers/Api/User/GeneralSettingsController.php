<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class GeneralSettingsController extends Controller
{
//    -------------------------------------- General Settings - Change Password --------------------------------------

    public function changePassword(Request $request)
    {

//        ------------------------------------------------- validation block -------------------------------------------------

        try {
            $validator = Validator::make($request->all(), [
                'old_password' => 'required',
                'new_password' => 'required',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $inputs = $validator->validated();

//        ------------------------------------------------- validation block -------------------------------------------------


            // Get the currently authenticated user
            $user = Auth::user();

            // Check if the old password matches the current password
            if (!Hash::check($request->input('old_password'), $user->password)) {
                return response()->json(['error' => 'Incorrect old password','status' => 400], 400);
            }

            // Update the user's password
            $user->password = Hash::make($request->input('new_password'));
            $user->save();

            // Return success response
            return response()->json(['message' => 'Password changed successfully','status' => 200], 200);

        }


//    -------------------------------------- General Settings - Change Password --------------------------------------

//  ------------------------------------------------- validation block -------------------------------------------------

        catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()], 422);
        }


//  ------------------------------------------------- validation block -------------------------------------------------


    }
}
