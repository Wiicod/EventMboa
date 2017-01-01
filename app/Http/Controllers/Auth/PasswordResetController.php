<?php
/**
 * Copyright (c) 01/01/17 13:57  Foris Fomekong.
 */

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\PasswordReset;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Mail;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|exists:users,email',
        ]);

        //invalidate old tokens
        PasswordReset::whereEmail($request->email)->delete();

        $email = $request->email;
        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);

        $token = $reset->token;

        Mail::send('auth.reset_link', compact('email', 'token'), function ($mail) use ($email) {
            $mail->to($email)
                ->from('noreply@example.com')
                ->subject('Event Mboa Password reset link');
        });

        return Response::json(['msg' => true], 200, [], JSON_NUMERIC_CHECK);
    }

    public function verify(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'token' => 'required',
        ]);

        $check = PasswordReset::whereEmail($request->email)
            ->whereToken($request->token)
            ->first();

        if (!$check) {
            return Response::json(['error' => 'Email does not exist'], 422, [], JSON_NUMERIC_CHECK);

        }


        return Response::json(['msg' => true], 200, [], JSON_NUMERIC_CHECK);

    }

    public function reset(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'token' => "required|exists:password_resets,token,email,{$request->email}",
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::whereEmail($request->email)->firstOrFail();
        $user->password = bcrypt($request->password);
        $user->save();

        //delete pending resets
        PasswordReset::whereEmail($request->email)->delete();

        return Response::json(['msg' => true], 200, [], JSON_NUMERIC_CHECK);
    }
}
