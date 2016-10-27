<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    public static $Status = ['new', 'created', 'active', 'end'];
    protected $fillable =['id','creator','event_topic_id','name','description','event_type_id','organizer_id',
        'start_date', 'end_date', 'recurring', 'banner_picture', 'status', 'town_id'];
    protected $dates=['start_date', 'end_date','created_at','updated_at'];

    private $foreign = ['event_topic', 'event_type', 'organizer', 'event_links', 'town'];

    private $files = ['banner_picture'];

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

    public function getStatusAttribute($val){

        return strlen($val) == 1 ? self::$Status[$val] : $val;
    }

    public function setStatusAttribute($val)
    {
        if(is_string($val)&&strlen($val)==1){
            $this->attributes['status']=$val;
        }else{
            $this->attributes['status'] = array_search($val, self::$Status);
        }
    }


    public function event_topic(){
        return $this->belongsTo('App\EventTopic');
    }

    public function town()
    {
        return $this->belongsTo('App\Town');
    }

    public function event_links(){
        return $this->hasMany('App\EventLink');
    }

    public function event_type(){
        return $this->belongsTo('App\EventType');
    }

    public function organizer(){
        return $this->belongsTo('App\Organizer');
    }
    public function creator(){
        return $this->belongsTo('App\User','creator');
    }

    public function intrested_users(){
        return $this->belongsToMany('App\User','intrested_events');
    }

    public function tickets(){
        return $this->hasMany('App\Ticket');
    }
}
