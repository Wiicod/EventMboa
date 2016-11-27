<?php

namespace App\Http\Requests;

use App\Participant;
use App\Ticket;
use Illuminate\Support\Facades\Input;

class ParticipantRequest extends Request
{
    public function wantsJson()
    {
        return true;
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $max = 2;

        switch($this->method())
        {
            case 'GET':
            {

                return [
                    'number' => 'required|integer|sufficient|max:' . $max,
                    'status' => '',
                    'name' => 'max:255|required_with:email,phone',
                    'phone' => 'required_with:email,name|max:255|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|',
                    'email' => 'max:255|email|required_with:name,phone',
                    'user_id' => 'required_without:name,phone,email|integer|exists:users,id',
                    'ticket_id' => 'required|integer|exists:tickets,id',
                    'type_payment' => 'integer|exists:ticket_type_payments,id|required_paid|is_in_ticket_method'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                if ($t = Input::get('ticket_id'))
                    $max = Ticket::find($t)->max_command;
                return [
                    'number' => 'required|integer|sufficient|max:' . $max,
                    'name' => 'max:255|required_with:email,phone',
                    'phone' => 'required_with:email,name|max:255|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|',
                    'email' => 'max:255|email|required_with:name,phone',
                    'user_id' => 'required_without:name,phone,email|integer|exists:users,id|unique_with:participants,ticket_id,ticket_id',
                    'ticket_id' => 'required|integer|exists:tickets,id',
                    'type_payment' => 'integer|exists:ticket_type_payments,id|required_paid|is_in_ticket_method'
                ];
            }
            case 'PUT':
            {
                $pid = $this->route()->getParameter('participant');
                $max = Participant::find($pid)->ticket()->first()->max_command;
                return [
                    'number' => 'integer|sufficient|max:' . $max,
                    'name' => 'max:255|required_with:email,phone',
                    'phone' => 'required_with:email,name|max:255|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|',
                    'email' => 'max:255|email|required_with:name,phone',
                    'user_id' => 'required_without:name,phone,email|integer|exists:users,id|unique_with:participants,ticket_id,ticket_id,' . $pid,
                    'ticket_id' => 'integer|exists:tickets,id',
                    'type_payment' => 'integer|exists:ticket_type_payments,id|required_paid|is_in_ticket_method'
                ];
            }
            case 'PATCH':
            {
                return [
                ];
            }
            default:break;
        }
    }
}
