<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(ContactsTableSeeder::class);
        $this->call(CountriesSeeder::class);
        $this->call(DistributionPointsTableSeeder::class);
        $this->call(EventsTableSeeder::class);
        $this->call(EventLinksTableSeeder::class);
        $this->call(EventTopicsTableSeeder::class);
        $this->call(EventTypesTableSeeder::class);
        $this->call(HelpsTableSeeder::class);
        $this->call(IntrestedEventsTableSeeder::class);
        $this->call(OrganizersTableSeeder::class);
        $this->call(ParticipantsTableSeeder::class);
        $this->call(PeopleTableSeeder::class);
        $this->call(TicketTypePaymentsTableSeeder::class);
        $this->call(TicketsTableSeeder::class);
        $this->call(TownsTableSeeder::class);
        $this->call(TypePaymentsTableSeeder::class);
        $this->command->info('All seeders completed!');
    }
}
