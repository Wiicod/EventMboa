<?php

use App\EventLink;
use Illuminate\Database\Seeder;

class EventLinksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(EventLink::class, 5)->create();
    }
}
