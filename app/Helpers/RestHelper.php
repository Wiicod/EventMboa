<?php
/**
 * Created by PhpStorm.
 * User: Foris
 * Date: 20/10/2016
 * Time: 23:13
 */

namespace App\Helpers;


use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class RestHelper
{


    public static function get($Model)
    {
        $ms = new  $Model;
        $ord = $ms->timestamps;
        $data = Input::get();
        $fo = $ms->getForeign();
        $field = $ms->getFillable();
        $dates = $ms->getDates();
        foreach ($data as $key => $value) {
            if (in_array($key, $field)) {
                if (in_array($key, $dates)) {
                    $ms = $ms->whereDate($key, '=', $value);
                } else {

                    $ms = $ms->where($key, '=', $value);
                }
            }
        }

        if ($ord) {
            $ms = $ms->with($fo)->orderBy('updated_at')->get();
        } else {
            $ms = $ms->with($fo)->get();
        }

        return Response::json($ms, 200, [], JSON_NUMERIC_CHECK);
    }

    public static function store($Model, $data)
    {

        $m = self::pre_store($Model, $data);

        $m->save();

        return self::post_store($Model, $m);

    }

    public static function pre_store($Model, $data)
    {
        $m = new $Model;
        $name = explode("App\\", $Model)[1];
        $field = $m->getFillable();
        foreach ($data as $key => $value) {
            if (in_array($key, $field)) {
                if (in_array($key, $m->getFiles())) {
                    $image = $value;
                    $fpath = "img/" . strtolower($name) . "/" . uniqid() . '_' . $image->getClientOriginalName();
                    $m->$key = $fpath;
                    Storage::disk('local')->put($fpath, File::get($image));

                } else {
                    $m->$key = $value;
                }
            }
        }

        return $m;
    }

    public static function post_store($Model, $m)
    {
        $name = explode("App\\", $Model)[1];
        $m = $Model::with($m->getForeign())->find($m->id);
        Log::info(Carbon::now() . 'the ' . $name . '  ' . $m->getLabel() . ' has been created ');
        return Response::json($m, 200, [], JSON_NUMERIC_CHECK);
    }

    public static function show($Model, $id)
    {
        $m = new $Model;
        $name = explode("App\\", $Model)[1];
        $m = $Model::with($m->getForeign())->find($id);
        if ($m) {
            return Response::json($m, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return Response::json(array("erreur" => "the " . $name . " you are looking for does not exist"), 422);
        }
    }

    public static function update($Model, $data, $id)
    {
        $m = $Model::find($id);
        $name = explode("App\\", $Model)[1];
        if ($m) {

            $field = $m->getFillable();
            foreach ($data as $key => $value) {
                if (in_array($key, $field)) {
                    if (in_array($key, $m->getFiles())) {
                        if (Storage::has($m->$key))
                            Storage::delete($m->$key);
                        $image = $value;
                        $fpath = "img/" . strtolower($name) . "/" . uniqid() . '_' . $image->getClientOriginalName();
                        $m->$key = $fpath;
                        Storage::disk('local')->put($fpath, File::get($image));

                    } else {
                        $m->$key = $value;
                    }
                }
            }
            $m->save();
            Log::info(Carbon::now() . 'the ' . $name . ' ' . $m->getLabel() . ' has been updated ');
            return Response::json($m, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return Response::json(array("erreur" => "the " . $name . " you are looking for does not exist"), 422);
        }
    }

    public static function delete($Model, $id)
    {
        $m = $Model::find($id);
        $name = explode("App\\", $Model)[1];
        if ($m) {
            foreach ($m->getFiles() as $img) {
                if (Storage::has($img))
                    Storage::delete($img);
            }

            $m->delete();
            Log::critical(Carbon::now() . 'the ' . $name . ' ' . $m->getLabel() . ' has been deleted');
            return Response::json($m, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return Response::json(array("erreur" => "the " . $name . " you are looking for does not exist"), 422);
        }
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['the user does not exist'], 404);
            }

        } catch (TokenExpiredException $e) {

            return response()->json(['token expire'], $e->getStatusCode());

        } catch (TokenInvalidException $e) {

            return response()->json(['token invalid'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token absent'], $e->getStatusCode());

        }

        return $user;
    }
}