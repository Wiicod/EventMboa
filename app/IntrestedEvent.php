<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntrestedEvent extends Model
{
    //
    protected $fillable =['id','user_id','event_id'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function event(){
        return $this->belongsTo('App\Event');
    }
}
