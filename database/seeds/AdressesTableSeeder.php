<?php

use App\Adress;
use Illuminate\Database\Seeder;

class AdressesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(Adress::class, 16)->create();
    }
}
