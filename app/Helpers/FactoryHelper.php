<?php
/**
 * Created by PhpStorm.
 * User: Ets Simon
 * Date: 17/10/2016
 * Time: 14:51
 */

namespace App\Helpers;


use Faker\Generator;

class FactoryHelper
{

    public static function getOrCreate($M, $new = false)
    {

        $ms = $M::get();
        $lenms = count($ms);
        if ($lenms == 0 || $new) {
            $m = factory($M)->create();
        } else {
            $m = $ms[rand(0, $lenms - 1)];

        }
        return $m;
    }

    public static function fakeFile(Generator $faker, $src)
    {
        $dst = "storage/app/img/" . $src;
        if (!is_dir($dst))
            mkdir($dst, 0777, true);

        $path = $faker->file("public/seeds/" . $src . "/", $dst);
        $path = explode("storage/app", $path)[1];
        return $path;
    }


}