<?php

use App\EventTopic;
use Illuminate\Database\Seeder;

class EventTopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(EventTopic::class, 10)->create();
    }
}
