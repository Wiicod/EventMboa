<?php

use App\Publicity;
use Illuminate\Database\Seeder;

class PublicitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(Publicity::class, 3)->create();
    }
}
