<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organizer extends Model
{
    //
    protected $fillable =['id','name','description','image','web_site','facebook','twitter','instagram','google',
        'linkedin'];

    public function events(){
        return $this->hasMany('App\Event');
    }
}
