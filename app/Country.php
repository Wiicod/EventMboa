<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    //
    protected $table = 'countries';
    protected $fillable =['id','capital','citizenship','country_code','currency','currency_code','currency_sub_unit',
    'currency_symbol','full_name','iso_3166_2','iso_3166_3','name','region_code','sub_region_code','eea','calling_code',
    'flag'];

    private $foreign = [];
    private $files = ['flag'];

    public function getForeign()
    {
        return $this->foreign;
    }


    public function getFiles()
    {
        return $this->files;
    }

    public function getFlagAttribute($val)
    {
        return "img/flags/" . $val;
    }

    public function getLabel()
    {
        return $this->name;
    }

    public function towns(){
        return $this->hasMany('App\Town');
    }

}
