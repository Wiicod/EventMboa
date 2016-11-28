<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->clear();
        $this->call(CountriesSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ContactsTableSeeder::class);
        $this->call(AdressesTableSeeder::class);
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
        $this->call(PublicitiesTableSeeder::class);
        $this->call(TicketsTableSeeder::class);
        $this->call(TownsTableSeeder::class);
        $this->call(TypePaymentsTableSeeder::class);
        $this->call(MobileReceiverTableSeeder::class);
        $this->call(TicketTypePaymentsTableSeeder::class);
        $this->command->info('All seeders completed!');
    }

    private function clear()
    {
        $directory = "storage/app/img";
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $tableNames = Schema::getConnection()->getDoctrineSchemaManager()->listTableNames();
        foreach ($tableNames as $name) {
            //if you don't want to truncate migrations
            if ($name == 'migrations') {
                continue;
            }
//            DB::table($name)->delete();
            DB::table($name)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->recursiveRemoveDirectory($directory);


    }

    private function recursiveRemoveDirectory($directory)
    {
        foreach (glob("{$directory}/*") as $file) {
            if (is_dir($file)) {
                $this->recursiveRemoveDirectory($file);
            } else {
                unlink($file);
            }
        }
//        rmdir($directory);
    }
}
