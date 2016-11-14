<?php

namespace App\Jobs;

use App\Event;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewEventEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $event;

    public function __construct(Event $event)
    {
        //
        $this->event = Event::with($event->getForeign())->find($event->id);

    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $e = $this->event;
        if ($e->user()->first()) {

            $to = $e->user()->first()->email;
        } else {
            $to = $e->organizer()->first()->email;
        }


        Mail::send(['emails.new_event', 'emails.new_event-text'], ['event' => $e, 'email' => $to],
            function ($message) use ($e, $to) {

                $message->to($to)
                    ->subject($e->title . " ( Speedy-click commentaire )");
            });
    }
}
