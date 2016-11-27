<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, Mandrill, and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
    ],

    'ses' => [
        'key' => env('SES_KEY'),
        'secret' => env('SES_SECRET'),
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
    ],
    'paypal' => [
        // set your paypal credential
        'client_id' => env('PAYPAL_CLIENT_ID'),
        'secret' => env('PAYPAL_SECRET'),

        /**
         * SDK configuration
         */
        'settings' => [
            /**
             * Available option 'sandbox' or 'live'
             */
            'mode' => 'sandbox',

            /**
             * Specify the max request time in seconds
             */
            'http.ConnectionTimeOut' => 30,

            /**
             * Whether want to log to a file
             */
            'log.LogEnabled' => true,

            /**
             * Specify the file that want to write on
             */
            'log.FileName' => storage_path() . '/logs/paypal.log',

            /**
             * Available option 'FINE', 'INFO', 'WARN' or 'ERROR'
             *
             * Logging is most verbose in the 'FINE' level and decreases as you
             * proceed towards ERROR
             */
            'log.LogLevel' => 'FINE'
        ],
    ],
    'braintree' => [
        'model'  => App\User::class,
        'environment' => env('BRAINTREE_ENV'),
        'merchant_id' => env('BRAINTREE_MERCHANT_ID'),
        'public_key' => env('BRAINTREE_PUBLIC_KEY'),
        'private_key' => env('BRAINTREE_PRIVATE_KEY'),
    ],

];
