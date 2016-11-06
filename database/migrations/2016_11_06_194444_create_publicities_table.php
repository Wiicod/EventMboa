<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePublicitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publicities', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('status');
            $table->string('type');
            $table->string('company');
            $table->string('banner_picture')->nullable();
            $table->string('web_site')->nullable();
            $table->string('url');
            $table->mediumText('description');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('publicities');
    }
}
