<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    //
    protected $fillable =['id','event_id','name','description','quantity','amount','start_date','end_date',
        'listing_privity','max_command'];

    protected $dates=['start_date','end_date','created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function event(){
        return $this->belongsTo('App\Event');
    }

    public function distribution_points(){
        return $this->hasMany('App\DistributionPoint');
    }

    public function participants(){
        return $this->belongsToMany('App\User',"participants")->withPivot('id','ticket_id','user_id','number',
            'created_at','updated_at');
    }

    public function type_payments(){
        return $this->belongsToMany('App\TypePayment','ticket_type_payments');
    }
}
