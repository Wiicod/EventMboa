<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventLink extends Model
{
    //
    protected $fillable =['id','event_id','url','name'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function event(){
        return $this->belongsTo('App\Event');
    }
}
