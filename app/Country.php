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

    public function getFlagAttribute($val)
    {
        return "img/flags/" . $val;
    }

    public function towns(){
        return $this->hasMany('App\Town');
    }

}
