<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Carbon\Carbon;
use HttpResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use JWTAuth;
use Mockery\CountValidator\Exception;
use Tymon\JWTAuth\Exceptions;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;


class AuthenticateController extends Controller
{
    //
    public function signin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //dd($credentials);

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                $user = JWTAuth::parseToken()->authenticate();
                Log::info(Carbon::now() . 'the user' . $user->email . ' is loged ');

                return response()->json(['erreur' => 'donnees de connexion invalide'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['erreur' => 'impossible de creer le token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['l\'utilisateur n\'existe pas'], 404);
            }

        } catch (TokenExpiredException $e) {

            return response()->json(['token expire'], $e->getStatusCode());

        } catch (TokenInvalidException $e) {

            return response()->json(['token invalide'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token absent'], $e->getStatusCode());

        }

        return response()->json(compact('user'));
    }

    public function refreshToken()
    {

        $token = JWTAuth::getToken();

        if (!$token) {
            return response()->json(['erreur' => 'Token inexistant'], 401);
        }

        try {

            $refreshToken = JWTAuth::refresh($token);

        } catch (TokenExpiredException $e) {

            return response()->json(['token expire'], $e->getStatusCode());

        } catch (TokenInvalidException $e) {

            return response()->json(['token invalide'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token absent'], $e->getStatusCode());

        }

        return Response::json(compact('refreshToken'), 200);
    }

    public function signup()
    {
        $credentials = Input::only('email', 'password');

        try {
            $user = User::create($credentials);
            Log::info(Carbon::now() . 'the user' . $user->email . ' has been created ');

        } catch (Exception $e) {
            return Response::json(['error' => 'User already exists.'], HttpResponse::HTTP_CONFLICT);
        }

        $token = JWTAuth::fromUser($user);
        Log::info(Carbon::now() . 'the user' . $user->email . ' is loged ');


        return Response::json(compact('token'));
    }
}
