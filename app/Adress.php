<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Adress extends Model
{
    //
    protected $fillable = ['id', 'name', 'street', 'post_box', 'town_id'];

    protected $dates = ['created_at', 'updated_at'];
    private $foreign = ['town'];
    private $files = [];

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
        return $this->name . " " . $this->street;
    }

    //protected $dateFormat='d-m-Y H:i:s';


    public function town()
    {
        return $this->belongsTo('App\Town');
    }

    public function events()
    {
        return $this->hasMany('App\Event');
    }
}
