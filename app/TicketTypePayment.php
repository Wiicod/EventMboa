<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketTypePayment extends Model
{
    //
    protected $fillable =['id','ticket_id','type_payment_id'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function ticket(){
        return $this->belongsTo('App\Ticket');
    }

    public function type_payment(){
        return $this->belongsTo('App\TypePayment');
    }
}
