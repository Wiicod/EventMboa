<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TicketTypePayment extends Model
{
    //
    protected $fillable =['id','ticket_id','type_payment_id'];

    private $foreign = ['ticket', 'type_payment'];

    private $files = [];

    /**
     * @return array
     */
    public function getFiles()
    {
        return $this->files;
    }

    public function getForeign()
    {
        return $this->foreign;
    }

    public function getLabel()
    {
        return 'ticket ' . $this->ticket_id . ' type payment' . $this->type_payment_id;
    }

    public function ticket(){
        return $this->belongsTo('App\Ticket');
    }

    public function type_payment(){
        return $this->belongsTo('App\TypePayment');
    }
}
