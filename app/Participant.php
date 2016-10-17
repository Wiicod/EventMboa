<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    //
    protected $fillable =['id','user_id','ticket_id','number'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function ticket(){
        return $this->belongsTo('App\Ticket');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

}
