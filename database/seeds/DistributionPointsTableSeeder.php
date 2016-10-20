<?php

use App\DistributionPoint;
use Illuminate\Database\Seeder;

class DistributionPointsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(DistributionPoint::class, 5)->create();
    }
}
