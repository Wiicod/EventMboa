<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DistributionPoint extends Model
{
    //
    protected $fillable = ['id', 'adress_id', 'ticket_id', 'name', 'date'];

    protected $dates=['date','created_at','updated_at'];

    private $foreign = ['ticket', 'adress'];

    private $files = [];

    /**
     * @return array
     */
    public function getFiles()
    {
        return $this->files;
    }

    public function getLabel()
    {
        return $this->name;
    }

    public function adress()
    {
        return $this->belongsTo('App\Adress');
    }
    public function ticket(){
        return $this->belongsTo('App\Ticket');
    }

    public function getForeign()
    {
        return $this->foreign;
    }
}
