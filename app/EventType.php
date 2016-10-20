<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    //
    protected $fillable =['id','name','description'];


    public function events(){
        return $this->hasMany('App\Event');
    }
}
