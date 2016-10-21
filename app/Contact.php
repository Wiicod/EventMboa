<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
    protected $fillable =['id','user_id','first_name','last_name','email'];

    protected $dates=['created_at','updated_at'];
    private $foreign = ['user'];
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
        return $this->first_name . " " . $this->last_name;
    }

    //protected $dateFormat='d-m-Y H:i:s';


    public function user(){
        return $this->belongsTo('App\User');
    }
}
