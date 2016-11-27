<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Enviroment
    |--------------------------------------------------------------------------
    |
    | Please provide the enviroment you would like to use for braintree.
    | This can be either 'sandbox' or 'production'.
    |
    */
    'environment' => 'sandbox',

    /*
    |--------------------------------------------------------------------------
    | Merchant ID
    |--------------------------------------------------------------------------
    |
    | Please provide your Merchant ID.
    |
    */
    'merchantId' => env('BRAINTREE_MERCHANT_ID'),

    /*
    |--------------------------------------------------------------------------
    | Public Key
    |--------------------------------------------------------------------------
    |
    | Please provide your Public Key.
    |
    */
    'publicKey' => env('BRAINTREE_PUBLIC_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Private Key
    |--------------------------------------------------------------------------
    |
    | Please provide your Private Key.
    |
    */
    'privateKey' => env('BRAINTREE_PRIVATE_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Client Side Encryption Key
    |--------------------------------------------------------------------------
    |
    | Please provide your CSE Key.
    |
    */
    'clientSideEncryptionKey' => 'my_client_side_encryption_key',

];