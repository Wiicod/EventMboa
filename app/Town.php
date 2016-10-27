<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Town extends Model
{
    //
    protected $fillable =['id','country_id','name'];

    private $foreign = ['country', 'events', 'adresses'];

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
        return $this->name;
    }
    public function distribution_points(){
        return $this->hasMany('App\DistributionPoint');
    }

    public function country(){
        return $this->belongsTo('App\Country');
    }

    public function adresses()
    {
        return $this->hasMany('App\Adress');
    }

}
