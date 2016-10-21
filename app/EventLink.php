<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EventLink extends Model
{
    //
    protected $fillable =['id','event_id','url','name'];

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

    public function event(){
        return $this->belongsTo('App\Event');
    }
}
