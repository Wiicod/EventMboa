<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DistributionPoint extends Model
{
    //
    protected $fillable =['id','town_id','ticket_id','name','date'];

    protected $dates=['date','created_at','updated_at'];

    public function town(){
        return $this->belongsTo('App\Town');
    }
    public function ticket(){
        return $this->belongsTo('App\Ticket');
    }
}
