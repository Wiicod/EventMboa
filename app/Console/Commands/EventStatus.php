<?php

namespace App\Console\Commands;

use App\Event;
use Carbon\Carbon;
use Illuminate\Console\Command;

class EventStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'event:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update ended Event status to end';

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
        $today = Carbon::today()->toDateTimeString();
        $events = Event::where('status', '!=', 3)
            ->whereDate('end_date', '<=', Carbon::yesterday()->toDateTimeString())->get();
        foreach ($events as $e) {
            $e->status = 3;
            $e->save();
        }
        $events = Event::whereDate('start_date', '<=', $today)
            ->whereDate('end_date', '>', $today)->get();
        foreach ($events as $e) {
            $e->status = 2;
            $e->save();
        }

        $this->info('Events status have been updated !');
    }
}
