<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    //
    protected $fillable =['id','user_id','first_name','last_name','home_phone','cell_phone','birthdate','picture',
    'facebook','twitter','instagram','google','linkedin'];

    protected $dates=['birthdate','created_at','updated_at'];

    private $foreign = ['user'];

    private $files = ['picture'];

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
        return $this->first_name . " " . $this->last_name;
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

}
