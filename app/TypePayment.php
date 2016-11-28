<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypePayment extends Model
{
    //
    protected $fillable = ['id', 'name', 'description', 'tag'];

    private $foreign = [];

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
        return $this->name;
    }

    public function tickets(){
        return $this->belongsToMany('App\Ticket','ticket_type_payments');
    }

    public function mobile_receivers()
    {
        return $this->hasMany('App\MobileReceiver');
    }
}
