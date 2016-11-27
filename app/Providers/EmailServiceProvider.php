<?php

namespace App\Providers;

use App\Event;
use App\Jobs\SendNewEventEmail;
use App\Jobs\SendParticpantTicketEmail;
use App\Participant;
use Illuminate\Support\ServiceProvider;

class EmailServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        //$this->inform(Event::with((new Event)->getForeign())->first());
        Event::created(function ($e) {

            dispatch((new SendNewEventEmail($e))->delay(60 * 5));
        });
        Event::updated(function (Event $e) {
            dispatch((new SendNewEventEmail($e))->delay(60 * 5));
        });

        Participant::created(function ($p) {
            if ($p->status = 'paid')
                dispatch((new SendParticpantTicketEmail($p))->delay(60 * 5));

        });

        Participant::updated(function ($p) {

            if ($p->status = 'paid')
                dispatch((new SendParticpantTicketEmail($p))->delay(60 * 5));
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
