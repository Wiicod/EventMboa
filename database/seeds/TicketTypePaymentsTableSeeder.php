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
        factory(TicketTypePayment::class, 10)->create();
    }
}
