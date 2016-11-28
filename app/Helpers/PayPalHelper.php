<?php
/**
 * Copyright (c) 27/11/16 15:57  Foris Fomekong.
 */

/**
 * Created by PhpStorm.
 * User: Ets Simon
 * Date: 27/11/2016
 * Time: 15:57
 */

namespace App\Helpers;


use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;

class PayPalHelper
{

    private $_api_context;
    private $model = 'participant';

    public function __construct()
    {
        $paypal_conf = Config::get('services.paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);
    }

    public function start($p)
    {
        if ($p->name) {
            $name = $p->name;
        } else {
            if ($pe = $p->user()->first()->person()->first()) {
                $name = $pe->first_name;
            } else {
                $name = $p->user()->first()->email;
            }
        }
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');


        $ticket = $p->ticket()->first();

        if ($ticket->taxe_include) {
            $price = $ticket->amount;
        } else {
            $price = $ticket->amount + $ticket->taxe;
        }

        $price = $this->convert($price);
        $item_1 = new Item();
        $item_1->setName($name . ' tickect')// item name
        ->setCurrency('USD')
            ->setQuantity($p->number)
            ->setPrice($price); // unit price


        $details = new Details();
        /* $details->setShipping(1.2)
             ->setTax(1.3)
             ->setSubtotal($p->number*$price);*/
        // add item to list
        $item_list = new ItemList();
        $item_list->setItems(array($item_1));

        $amount = new Amount();
        $amount->setCurrency('USD')
            ->setTotal($p->number * $price);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription('Ticket pour l\'evenement '
                . $ticket->event()->first()->name);

        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl(URL::route('payment.status'))// Specify return URL
        ->setCancelUrl(URL::route('payment.cancel'));

        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions(array($transaction));


        try {
            $payment->create($this->_api_context);
        } catch (\PayPal\Exception\PayPalConnectionException $ex) {
            if (Config::get('app.debug')) {
                echo "Exception: " . $ex->getMessage() . PHP_EOL;
                $err_data = json_decode($ex->getData(), true);
                exit;
            } else {
                die('Some error occur, sorry for inconvenient');
            }
        }


        foreach ($payment->getLinks() as $link) {

            if ($link->getRel() == 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }


        // add payment ID to session
        Session::put('paypal_payment_id', $payment->getId());
        Session::put($this->model, $p);

        if (isset($redirect_url)) {
            // redirect to paypal
//         return   Redirect::to($redirect_url);
            return $redirect_url;
        }

        return Redirect::to('original.route')
            ->with('error', 'Unknown error occurred');
    }

    private function convert($price)
    {
        $tmp = $price / 550;
        $tmp *= 100;
        $tmp = ceil($tmp / 5) * 5 / 100;
        //$tmp= floor($tmp/5)*5/100;
        return $tmp;
    }

    public function end()
    {
        // Get the payment ID before session clear
        $payment_id = Session::get('paypal_payment_id');
        $p = Session::get($this->model);

        // clear the session payment ID
        Session::forget('paypal_payment_id');
        Session::forget($this->model);

        if (empty(Input::get('PayerID')) || empty(Input::get('token'))) {

            return Redirect::route('payment.fail')
                ->with('error', 'Payment failed');
        }

        $payment = Payment::get($payment_id, $this->_api_context);

        // PaymentExecution object includes information necessary
        // to execute a PayPal account payment.
        // The payer_id is added to the request query parameters
        // when the user is redirected from paypal back to your site
        $execution = new PaymentExecution();
        $execution->setPayerId(Input::get('PayerID'));

        //Execute the payment
        $result = $payment->execute($execution, $this->_api_context);

        //echo '<pre>';print_r($result);echo '</pre>';exit; // DEBUG RESULT, remove it later

        if ($result->getState() == 'approved') { // payment made

            $p->status = 'paid';
            return $p;
        }
        return Redirect::route('original.route')
            ->with('error', 'Payment failed');
    }
}