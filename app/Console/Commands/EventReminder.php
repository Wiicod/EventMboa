<?php

namespace App\Console\Commands;

use App\Event;
use App\Participant;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class EventReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'event:remind';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send remind email  to those who participate to an event';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $events = Event::with(['tickets'])->whereDate('start_date', '=', Carbon::tomorrow()->toDateTimeString())->get();
        foreach ($events as $e) {
            foreach ($e->tickets()->get() as $ticket) {
                $users = $ticket->participants()->get();
                $participants = Participant::where('user_id', '=', null)->where('ticket_id', '=', $ticket->id)->get();
                $this->remind($e, $users);
                $this->remind($e, $participants, false);
            }
        }

        $this->info('The remind  email were sent successfully!');
    }

    private function remind($e, $users, $is_user = true)
    {

        foreach ($users as $u) {
            $to = $u->email;
            if ($is_user) {

            } else {

            }
            Mail::send(['emails.remind_event', 'emails.remind_event-text'], ['event' => $e], function ($message) use ($e, $to) {

                $message->to($to)
                    ->subject("Rappel debut de l'evenement ( $e->name )");
            });
        }

    }
}
