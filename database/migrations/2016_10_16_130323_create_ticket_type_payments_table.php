<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTicketTypePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ticket_type_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ticket_id')->unsigned()->index();
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->integer('type_payment_id')->unsigned()->index();
            $table->foreign('type_payment_id')->references('id')->on('type_payments')->onDelete('cascade');
            $table->unique(array('ticket_id', 'type_payment_id'));

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
        Schema::drop('ticket_type_payments');
    }
}
