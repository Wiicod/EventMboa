<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Town extends Model
{
    //
    protected $fillable =['id','country_id','name'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function distribution_points(){
        return $this->hasMany('App\DistributionPoint');
    }

    public function country(){
        return $this->belongsTo('App\Country');
    }
}
