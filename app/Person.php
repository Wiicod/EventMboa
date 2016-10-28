<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    //
    protected $fillable =['id','user_id','first_name','last_name','home_phone','cell_phone','birthdate','picture',
        'facebook', 'twitter', 'instagram', 'google', 'linkedin', 'sex', 'web_site', 'adress_id'];

    protected $dates=['birthdate','created_at','updated_at'];

    private $foreign = ['user', 'adress'];

    private $files = ['picture'];

    public function getSexAttribute($val)
    {

        return $val == true ? "M" : "F";
    }

    public function setSexAttribute($val)
    {
        if (is_int($val)) {
            $this->attributes['sex'] = $val == "1" ? true : false;
        } else {
            $this->attributes['sex'] = $val == "M" ? true : false;
        }
    }

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

    public function adress()
    {
        return $this->belongsTo('App\Adress');
    }

}
