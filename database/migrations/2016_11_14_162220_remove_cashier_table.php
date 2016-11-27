<?php

use Illuminate\Database\Migrations\Migration;

class RemoveCashierTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::drop('subscriptions');
        Schema::table('users', function ($table) {
            $table->dropColumn(['trial_ends_at', 'card_last_four', 'card_brand', 'paypal_email', 'braintree_id']);
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
        Schema::table('users', function ($table) {
            $table->string('braintree_id')->nullable();
            $table->string('paypal_email')->nullable();
            $table->string('card_brand')->nullable();
            $table->string('card_last_four')->nullable();
            $table->timestamp('trial_ends_at')->nullable();
        });

        Schema::create('subscriptions', function ($table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('name');
            $table->string('braintree_id');
            $table->string('braintree_plan');
            $table->integer('quantity');
            $table->timestamp('trial_ends_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
        });

    }
}
