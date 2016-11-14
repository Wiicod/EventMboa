<?php

namespace App\Providers;

use App\Event;
use App\Helpers\FactoryHelper;
use App\Participant;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
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

            $e = Event::with($e->getForeign())->find($e->id);
            $this->inform($e);
        });
        Event::updated(function (Event $e) {
            $e = Event::with($e->getForeign())->find($e->id);
            $this->inform($e);
        });

        Participant::created(function ($p) {

            $p = Event::with($p->getForeign())->find($p->id);
            $this->send_ticket($p);
        });

        Participant::updated(function ($p) {

            $p = Event::with($p->getForeign())->find($p->id);
            $this->send_ticket($p);
        });
    }

    private function inform(Event $e)
    {

        $to = $e->user()->first()->email;
        Mail::send(['emails.new_event', 'emails.new_event-text'], ['event' => $e], function ($message) use ($e, $to) {

            $message->to($to)
                ->subject($e->title . " ( Speedy-click commentaire )");
        });
    }

    private function send_ticket(Participant $p)
    {

        $e = Event::first();
        $snappy = App::make('snappy.pdf');
        $html = View::make("pdf.ticket", compact('e'))->render();
        /*$snappy->setOption('margin-left', 0);
        $snappy->setOption('margin-top', 0);
        $snappy->setOption('margin-right', 0);
        $snappy->setOption('margin-bottom', 0);*/
        $snappy->setOption('encoding', 'UTF-8');
        $fname = public_path(uniqid() . 'temp.pdf');

        $snappy->generateFromHtml($html, $fname);
        $t = FactoryHelper::NewGuid();
        $fname2 = 'pdf/unsigned/' . $t . '.pdf';
        Storage::put(
            $fname2,
            file_get_contents($fname)
        );
        $to = $e->user()->first()->email;
        Mail::send(['emails.ticket', 'emails.ticket-text'], ['event' => $e], function ($message) use ($e, $to) {

            $message->to($to)
                ->subject($e->title . " ( Speedy-click commentaire )");
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
