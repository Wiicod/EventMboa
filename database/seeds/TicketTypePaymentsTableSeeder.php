<?php

use App\TicketTypePayment;
use Illuminate\Database\Seeder;

class TicketTypePaymentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $tickettypes = factory(TicketTypePayment::class, 1)->make();
        foreach ($tickettypes as $tickettype) {
            repeat:
            try {
                $tickettype->save();
            } catch (\Illuminate\Database\QueryException $e) {
                $tickettype = factory(App\TicketTypePayment::class)->make();
                goto repeat;
            }
        }
    }
}
