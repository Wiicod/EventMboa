<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','braintree_id','paypal_email','card_brand','card_last_four','trial_ends_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function person(){
        return $this->hasOne('App\Person');
    }

    public function contacts(){
        return $this->hasMany('App\Contact');
    }

    public function creators(){
        return $this->hasMany('App\Event');
    }

    public function intrested_events(){
        return $this->belongsToMany('App\Event','intrested_events');
    }

    public function tickets(){
        return $this->belongsToMany('App\Ticket',"participants")->withPivot('id','ticket_id','user_id','number',
            'created_at','updated_at');
    }


}
