<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    //
    protected $fillable =['id','name','description','image','web_site','facebook','twitter','instagram','google',
        'linkedin'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function events(){
        return $this->hasMany('App\Event');
    }
}
