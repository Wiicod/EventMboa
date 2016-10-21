<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    //
    protected $fillable =['id','user_id','ticket_id','number'];

    private $foreign = ['user', 'ticket'];

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
        return $this->user_id . ' ticket ' . $this->ticket_id . ' number ' . $this->number;
    }

    public function ticket(){
        return $this->belongsTo('App\Ticket');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

}
