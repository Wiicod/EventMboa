<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddSexAndAdressOnPeopleAndAdressOnDistributionPoints extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('people', function (Blueprint $table) {

            $table->boolean('sex');
            $table->string('web_site')->nullable();
            $table->integer('adress_id')->unsigned()->index()->nullable();
            $table->foreign('adress_id')->references('id')->on('adresses')->onDelete('set null');
        });

        Schema::table('distribution_points', function (Blueprint $table) {

            $table->dropForeign(['town_id']);
            $table->dropColumn('town_id');
            $table->integer('adress_id')->unsigned()->index()->nullable();
            $table->foreign('adress_id')->references('id')->on('adresses')->onDelete('cascade');

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
        Schema::table('distribution_points', function (Blueprint $table) {

            $table->dropForeign(['adress_id']);
            $table->dropColumn('adress_id');
            $table->integer('town_id')->unsigned()->index()->nullable();
            $table->foreign('town_id')->references('id')->on('towns')->onDelete('cascade');

        });
        Schema::table('people', function (Blueprint $table) {

            $table->dropForeign(['adress_id']);
            $table->dropColumn('adress_id');
            $table->dropColumn('web_site');
            $table->dropColumn('sex');

        });
    }
}
