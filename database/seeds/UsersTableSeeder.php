<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $users = [
            [
                "email" => "testuser@gmail.com",
                "password" => Hash::make("testuser"),
                'remember_token' => str_random(10)
            ]
        ];
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
