<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IntrestedEvent extends Model
{
    //
    protected $fillable =['id','user_id','event_id'];

    private $foreign = ['user', 'event'];

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
        return $this->id;
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function event(){
        return $this->belongsTo('App\Event');
    }
}
