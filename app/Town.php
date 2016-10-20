<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Town extends Model
{
    //
    protected $fillable =['id','country_id','name'];

    public function distribution_points(){
        return $this->hasMany('App\DistributionPoint');
    }

    public function country(){
        return $this->belongsTo('App\Country');
    }
}
