<?php

namespace App\Jobs;

use App\Participant;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;

class SendParticpantTicketEmail extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    private $participant;

    public function __construct(Participant $participant)
    {
        //
        $this->participant = Participant::with($participant->getForeign())->find($participant->id);;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $e = $this->participant->ticket()->first()->event()->first();
        $snappy = App::make('snappy.pdf');
        $html = View::make("pdf.ticket", compact('e'))->render();
        /*$snappy->setOption('margin-left', 0);
        $snappy->setOption('margin-top', 0);
        $snappy->setOption('margin-right', 0);
        $snappy->setOption('margin-bottom', 0);*/
        $snappy->setOption('encoding', 'UTF-8');
        $attach = [];
        for ($i = 0; $i < $this->participant->number; $i++) {

//            $attach[$i]= public_path(FactoryHelper::NewGuid('pdf'));
//            $attach[$i]=  $snappy->generateFromHtml($html, $attach[$i]);

            $attach[$i] = $snappy->getOutputFromHtml($html);
        }


        /*if(file_exists($fname))
            unlink($fname);*/
        $to = $e->user()->first()->email;
        Mail::send(['emails.ticket', 'emails.ticket-text'], ['event' => $e], function ($message) use ($e, $to, $attach) {

            $message->to($to);

            $m = 0;
            foreach ($attach as $at) {
                $m++;
                $message = $message->attachData($at, 'ticket-' . $m . '.pdf', [
                    'mime' => 'application/pdf',
                ]);
            }
            $message->subject(" Vos tickets pour l evenement ( $e->name )");
        });
    }
}
