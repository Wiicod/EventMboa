<?php

use App\TypePayment;
use Illuminate\Database\Seeder;

class TypePaymentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(TypePayment::class, 5)->create();
    }
}
