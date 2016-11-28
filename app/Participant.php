<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use QrCode;

class Participant extends Model
{
    //
    public static $Status = ['not-paid', 'paid'];
    protected $fillable = ['id', 'user_id', 'ticket_id', 'number', 'name', 'phone', 'email', 'status'];
    protected $appends = array('qrcodes');
    private $foreign = ['user', 'ticket'];
    private $files = [];
    public static $Status = ['not-paid', 'paid'];
    public function getStatusAttribute($val)
    {

        return strlen($val) == 1 ? self::$Status[$val] : $val;
    }

    public function setStatusAttribute($val)
    {
        if ((is_string($val) && strlen($val) == 1) or (is_int($val))) {
            $this->attributes['status'] = $val;
        } else {
            $this->attributes['status'] = array_search($val, self::$Status);
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
        return $this->user_id . ' ticket ' . $this->ticket_id . ' number ' . $this->number;
    }


    public function getStatusAttribute($val)
    {

        return strlen($val) == 1 ? self::$Status[$val] : $val;
    }

    public function setStatusAttribute($val)
    {
        if ((is_string($val) && strlen($val) == 1) or (is_int($val))) {
            $this->attributes['status'] = $val;
        } else {
            $this->attributes['status'] = array_search($val, self::$Status);
        }
    }

    public function getQrcodesAttribute()
    {

        $res = [];
        $n = (int)$this->attributes['number'];


        if ($this->user()->exists()) {
            for ($i = 0; $i < $n; $i++) {
                $res[] = QrCode::errorCorrection('H')->color(255, 0, 255)->generate('ticket '
                    . $this->ticket()->first()->name . ' ' . $i . '/' . $n
                    . ' for ' . $this->user()->first()->email
                );
            }
        } else {
            for ($i = 0; $i < $n; $i++) {
                $res[] = QrCode::errorCorrection('H')->color(255, 0, 255)->generate('ticket '
                    . $this->ticket()->first()->name . ' ' . $i . '/' . $n
                    . ' for ' . $this->name
                );
            }
        }


        return $res;


    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function ticket()
    {
        return $this->belongsTo('App\Ticket');

    }

}
