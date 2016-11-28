<?php namespace App\Providers\Validation;

use App\Participant;
use App\Ticket;
use App\TicketTypePayment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Str;
use Illuminate\Validation\Validator;

// It's important to extend the Validator class
// By doing that we make sure we keep all the other rules as well!
// Now if you want to override a rule you can do that here as well
// For now we will only focus on creating rules
class CustomValidation extends Validator
{

    // Laravel keeps a certain convention for rules
    // So the function is called validateGreaterThen
    // Then the rule is greater_then

    // A validation rule accepts three parameters
    // $attribute This is the name of the input
    // $value This is the value of the input
    // $parameters This is a parameter for the rule, so greater_then:1,2 has two parameters
    // the $parameters are returned as an array so for the first parameter: $parameters[0]

    // Now that we know how a rule works let's create one
    /**
     * $attribute Input name
     * $value Input value
     * $parameters Table, field1
     */

    public function __construct($translator, $data, $rules, $messages = array(), $customAttributes = array())
    {
        parent::__construct($translator, $data, $rules, $messages, $customAttributes);
        $this->implicitRules[] = Str::studly('required_paid');
        //$this->implicitRules[] = Str::studly('is_in_ticket_method');
    }

    public function validateUniqueWith($attribute, $value, $parameters)
    {
        // Now that we have our data we can check for the data

        // We first grab the correct table which is passed to the function
        // Now we need to do some checking using Eloquent
        // If you don't understand this, please let me know
        $table = array_shift($parameters);
        $val2 = Input::get($parameters[1]);
        $result = DB::table($table)->where(function ($query) use ($attribute, $value, $val2, $parameters) {
            $query->where($attribute, '=', $value)
                ->where($parameters[0], '=', $val2); // where lastname = value
        })->first();
        //dd($result);

        if ($result) {
            return count($parameters) == 3 and $result->id == $parameters[2] ? true : false;
        } else {
            return true;
        }
        //return !$result;


    }

    public function validateSufficient($attribute, $value, $parameters)
    {
        // Now that we have our data we can check for the data

        // We first grab the correct table which is passed to the function
        // Now we need to do some checking using Eloquent
        // If you don't understand this, please let me know

        $ticket = Ticket::find(Input::get('ticket_id'));
        $val = intval($value);
        if ($ticket == null)
            return false;

        $num = Participant::where('ticket_id', '=', $ticket->id)->get()->sum('number');


        return ($num + $val) <= intval($ticket->quantity);
        //return !$result;


    }

    public function validateRequiredPaid($attribute, $value)
    {

        $ticket = Ticket::find(Input::get('ticket_id'));

        if ($ticket == null)
            return false;
        if ($ticket->amount == null)
            return true;
        if (is_null($value))
            return false;

        return true;


    }

    public function validateIsInTicketMethod($attribute, $value)
    {
        if (!$this->validateInteger($attribute, $value))
            return false;

        $ticket = Ticket::find(Input::get('ticket_id'));

        $ttp = TicketTypePayment::find(Input::get('type_payment'));
        if ($ttp->ticket_id != $ticket->id)
            return false;

        return true;


    }

    // If you need more examples, let me know ;)
}
