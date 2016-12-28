<?php

namespace App\Providers;

use App\Event;
use App\Jobs\SendNewEventEmail;
use App\Jobs\SendParticpantTicketEmail;
use App\Participant;
use Illuminate\Support\ServiceProvider;

/**
 *
 */
class EmailServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    private $delay = 5;
    public function boot()
    {
        //
        //$this->inform(Event::with((new Event)->getForeign())->first());
        Event::created(function ($e) {

            dispatch((new SendNewEventEmail($e))->delay($this->delay));
        });
        Event::updated(function (Event $e) {
            dispatch((new SendNewEventEmail($e))->delay($this->delay));
        });

        Participant::created(function ($p) {
            if ($p->status = 'paid')
                dispatch((new SendParticpantTicketEmail($p))->delay($this->delay));

        });

        Participant::updated(function ($p) {

            if ($p->status = 'paid')
                dispatch((new SendParticpantTicketEmail($p))->delay($this->delay));
        });
    }


    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
