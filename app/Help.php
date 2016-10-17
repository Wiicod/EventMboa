<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Help extends Model
{
    //
    protected $fillable =['id','title','description'];

    protected $dates=['created_at','updated_at'];

    protected $dateFormat='d-m-Y H:i:s';
}
