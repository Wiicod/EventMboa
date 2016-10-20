<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    //
    protected $fillable =['id','user_id','first_name','last_name','email'];

    protected $dates=['created_at','updated_at'];

    //protected $dateFormat='d-m-Y H:i:s';


    public function user(){
        return $this->belongsTo('App\User');
    }
}
