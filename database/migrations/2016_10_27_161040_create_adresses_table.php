<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAdressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adresses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('street');
            $table->string('post_box');
            $table->integer('town_id')->unsigned()->index()->nullable();
            $table->foreign('town_id')->references('id')->on('towns')->onDelete('set null');
            $table->timestamps();
        });

        Schema::table('events', function (Blueprint $table) {

            $table->dropForeign(['town_id']);
            $table->dropColumn('town_id');

        });

        Schema::table('events', function (Blueprint $table) {

            $table->integer('adress_id')->unsigned()->index()->nullable();
            $table->foreign('adress_id')->references('id')->on('adresses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('events', function (Blueprint $table) {

            $table->dropForeign(['adress_id']);
            $table->dropColumn('adress_id');

        });
        Schema::table('events', function (Blueprint $table) {

            $table->integer('town_id')->unsigned()->index()->nullable();
            $table->foreign('town_id')->references('id')->on('towns')->onDelete('set null');
        });
        Schema::drop('adresses');
    }
}
