<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    //
    protected $fillable =['id','name','description'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function events(){
        return $this->hasMany('App\Event');
    }
}
