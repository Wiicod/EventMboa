<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventTopic extends Model
{
    //
    protected $fillable =['id','name','description'];


    public function events(){
        return $this->hasMany('App\Event');
    }
}
