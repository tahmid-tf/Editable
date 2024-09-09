<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{

    public function sendResetLinkEmail(Request $request)
    {
        // Validate the request
        $request->validate(['email' => 'required|email']);

        // Check if the user exists without revealing any information
        $user = \App\Models\User::where('email', $request->email)->first();

        if ($user) {
            // Use Laravel's built-in password broker to create and send the reset link
            $status = Password::sendResetLink(['email' => $request->email]);

            // Check if the email was sent successfully
            if ($status === Password::RESET_LINK_SENT) {
                return response()->json(['message' => 'If an account exists, a reset link has been sent'], 200);
            } else {
                return response()->json(['message' => 'Error sending reset link'], 500);
            }
        }

        // Return a generic message to avoid email enumeration
        return response()->json(['message' => 'If an account exists, a reset link has been sent'], 200);
    }


    public function resetPassword(Request $request)
    {

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                $user->tokens()->delete(); // Invalidate all tokens after password reset
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset successfully.'],200)
            : response()->json(['message' => 'Error resetting password, Token expired'], 500);
    }



}
