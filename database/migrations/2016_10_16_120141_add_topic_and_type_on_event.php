<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTopicAndTypeOnEvent extends Migration
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

            $table->integer('event_topic_id')->unsigned()->index()->unique()->nullable();;
            $table->foreign('event_topic_id')->references('id')->on('event_topics')->onDelete('set null');
            $table->integer('event_type_id')->unsigned()->index()->unique()->nullable();;
            $table->foreign('event_type_id')->references('id')->on('event_types')->onDelete('set null');
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
        Schema::table('events',function(Blueprint $table){

            $table->dropForeign(['event_type_id']);
            $table->dropColumn('event_type_id');
            $table->dropForeign(['event_topic_id']);
            $table->dropColumn('event_topic_id');

        });
    }
}
