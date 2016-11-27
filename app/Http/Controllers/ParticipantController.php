<?php

namespace App\Http\Controllers;

use App\Helpers\PayPalHelper;
use App\Helpers\RestHelper;
use App\Http\Requests\ParticipantRequest;
use App\Participant;
use App\Ticket;
use App\TicketTypePayment;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return RestHelper::get(Participant::class);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ParticipantRequest $request)
    {
        //
        $ticket = new Ticket();
        $ticket = Ticket::with($ticket->getForeign())->find($request->get('ticket_id'));
        $participant = RestHelper::pre_store(Participant::class, $request->all());
        if ($ticket->amount == null) {
            $participant->status = 'paid';
        } else {
            $ttp = TicketTypePayment::find($request->get('type_payment'));
            $ttp = $ttp->type_payment()->first();
            if ($ttp->tag == 'pp') {
                $pp = new PayPalHelper();
                return $pp->start($participant);
            } elseif ($ttp->tag == 'om') {
                $participant->status = 'not-paid';
            }
        }
        $participant->save();
        return RestHelper::post_store(Participant::class, $participant);
        //return RestHelper::store(Participant::class, $request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return RestHelper::show(Participant::class, $id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ParticipantRequest $request, $id)
    {
        //
        return RestHelper::update(Participant::class, $request->all(), $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return RestHelper::delete(Participant::class, $id);
    }

    public function getPaymentStatus()
    {
        $pp = new PayPalHelper();
        $p = $pp->end();
        $p->save();
        $name = ucfirst('participant');
        Log::info(Carbon::now() . 'the ' . $name . '  ' . $p->getLabel() . ' has been created ');
        return Redirect::route('payment.success', ['id' => 3145 * $p->id]);
        // return array('success', 'Payment success');
    }
}
