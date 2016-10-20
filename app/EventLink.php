<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventLink extends Model
{
    //
    protected $fillable =['id','event_id','url','name'];


    public function event(){
        return $this->belongsTo('App\Event');
    }
}
