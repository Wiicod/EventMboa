<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    //
    protected $fillable =['id','name','description','image','link'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function events(){
        return $this->hasMany('App\Event');
    }
}
