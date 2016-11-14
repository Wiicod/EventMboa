<?php

namespace App\Providers;

use App\Event;
use Illuminate\Support\Facades\Mail;
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
        $this->inform(Event::first());
        Event::created(function($e){

            $e = Event::with($e->getForeign())->find($e->id);
            $this->inform($e);
        });
        Event::updated(function(Event $e){
            $e = Event::with($e->getForeign())->find($e->id);
            $this->inform($e);
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

    private function inform( $e){
        $to= env("MAIL_USERNAME");
        Mail::send(['emails.new_event','emails.new_event-text'],['event' => $e],function($message) use ($e,$to){

            $message->to($to)
                ->subject($e->title." ( Speedy-click commentaire )");
        });
    }
}
