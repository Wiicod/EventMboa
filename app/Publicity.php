<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publicity extends Model
{
    //
    protected $fillable = ['id', 'title', 'status', 'type', 'company', 'banner_picture', 'web_site',
        'url', 'description', 'start_date', 'end_date'];

    protected $dates = ['created_at', 'updated_at', 'start_date', 'end_date'];
    private $foreign = [];
    private $files = ['banner_picture'];

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
        return $this->title;
    }
}
