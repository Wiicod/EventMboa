<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MobileReceiver extends Model
{
    //

    protected $fillable = ['id', 'country_id', 'phone'];

    private $foreign = ['country'];

    private $files = [];



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
