<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypePayment extends Model
{
    //
    protected $fillable =['id','name','description'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function tickets(){
        return $this->belongsToMany('App\Ticket','ticket_type_payments');
    }
}
