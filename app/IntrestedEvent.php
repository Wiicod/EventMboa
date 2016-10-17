<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntrestedEvent extends Model
{
    //
    protected $fillable =['id','user_id','event_id'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function event(){
        return $this->belongsTo('App\Event');
    }
}
