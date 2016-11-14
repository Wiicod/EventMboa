<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MobileReceiver extends Model
{
    //
    public static $Status = ['not-paid', 'paid'];
    protected $fillable = ['id', 'country_id', 'phone'];

    private $foreign = ['country'];

    private $files = [];

    public function getStatusAttribute($val)
    {

        return strlen($val) == 1 ? self::$Status[$val] : $val;
    }

    public function setStatusAttribute($val)
    {
        if ((is_string($val) && strlen($val) == 1) or (is_int($val))) {
            $this->attributes['status'] = $val;
        } else {
            $this->attributes['status'] = array_search($val, self::$Status);
        }
    }

    /**
     * @return array
     */
    public function getFiles()
    {
        return $this->files;
    }

    public function getForeign()
    {
        return $this->foreign;
    }

    public function getLabel()
    {
        return $this->phone;
    }


    public function country()
    {
        return $this->belongsTo('App\Country');
    }


}
