<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    //
    public static $ListingPrivity = ['public', 'privated', 'reserved'];
    protected $fillable =['id','event_id','name','description','quantity','amount','start_date','end_date',
        'listing_privity','max_command'];
    protected $dates=['start_date','end_date','created_at','updated_at'];

    private $foreign = ['event', 'ticket'];

    private $files = [];

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

    public function getListingPrivityAttribute($val)
    {

        return strlen($val) == 1 ? self::$ListingPrivity[$val] : $val;
    }

    public function setListingPrivityAttribute($val)
    {
        if (is_string($val) && strlen($val) == 1) {
            $this->attributes['listing_privity'] = $val;
        } else {
            $this->attributes['listing_privity'] = array_search($val, self::$ListingPrivity);
        }
    }


    public function event(){
        return $this->belongsTo('App\Event');
    }

    public function distribution_points(){
        return $this->hasMany('App\DistributionPoint');
    }

    public function participants(){
        return $this->belongsToMany('App\User',"participants")->withPivot('id','ticket_id','user_id','number',
            'created_at','updated_at');
    }

    public function type_payments(){
        return $this->belongsToMany('App\TypePayment','ticket_type_payments');
    }
}
