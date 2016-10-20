<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypePayment extends Model
{
    //
    protected $fillable =['id','name','description'];

    public function tickets(){
        return $this->belongsToMany('App\Ticket','ticket_type_payments');
    }
}
