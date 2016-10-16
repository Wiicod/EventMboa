<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOrganizerOnEvent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('events',function(Blueprint $table){

            $table->integer('organizer_id')->unsigned()->index()->unique()->nullable();;
            $table->foreign('organizer_id')->references('id')->on('organizers')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        //
        Schema::table('events',function(Blueprint $table){

            $table->dropForeign(['organizer_id']);
            $table->dropColumn('organizer_id');
        });
    }
}
