<?php

use App\MobileReceiver;
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
        factory(MobileReceiver::class, 2)->create();
    }
}
