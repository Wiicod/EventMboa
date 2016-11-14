<?php

use Illuminate\Database\Seeder;

class MobileReceiverTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(Participant::class, 2)->create();
    }
}
