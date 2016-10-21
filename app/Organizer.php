<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    //
    protected $fillable =['id','name','description','image','web_site','facebook','twitter','instagram','google',
        'linkedin'];

    private $foreign = [];

    private $files = ['image'];

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

    public function events(){
        return $this->hasMany('App\Event');
    }
}
