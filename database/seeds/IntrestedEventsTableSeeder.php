<?php

use App\IntrestedEvent;
use Illuminate\Database\Seeder;

class IntrestedEventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(IntrestedEvent::class, 10)->create();
    }
}
