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
        //factory(TypePayment::class, 5)->create();
        $types = [
            [
                "name" => "Paypal",
                "description" => "Payer le ticket en effectuant un transfert orange money",
                "tag" => 'pp'
            ],
            [
                "name" => "Orange Money",
                "description" => "Payer le ticket en effectuant un transfert orange money",
                "tag" => 'om'
            ],
            [
                "name" => "Mtn Mobile Money",
                "description" => "Payer le ticket en effectuant un transfert mtn mobile money",
                "tag" => 'mmo'
            ]
        ];
        foreach ($types as $t) {
            TypePayment::create($t);
        }
    }
}
