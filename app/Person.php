<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    //
    protected $fillable =['id','user_id','first_name','last_name','home_phone','cell_phone','birthdate','picture'];

    protected $dates=['birthdate','created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';

    public function user(){
        return $this->belongsTo('App\User');
    }

}
