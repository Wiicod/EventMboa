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

class RestHelper
{


    public static function get($Model)
    {
        $ms = new  $Model;
        foreach ($ms->getForeign() as $f) {
            if (Input::get($f)) {
                $ms = $ms->where($f, '=', Input::get($f));
            }
        }

        $ms = $ms->with($ms->getForeign())->orderBy('updated_at')->get();

        return Response::json($ms, 200, [], JSON_NUMERIC_CHECK);
    }

    public static function store($Model, $data)
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
        $m->save();
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
            $m->delete();
            Log::critical(Carbon::now() . 'the ' . $name . ' ' . $m->getLabel() . ' has been deleted');
            return Response::json($m, 200, [], JSON_NUMERIC_CHECK);
        } else {
            return Response::json(array("erreur" => "the " . $name . " you are looking for does not exist"), 422);
        }
    }
}