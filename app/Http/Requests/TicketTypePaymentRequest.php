<?php

namespace App\Http\Requests;

class TicketTypePaymentRequest extends Request
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
        switch($this->method())
        {
            case 'GET':
            {
                return [
                    'ticket_id' => 'required|integer|exists:tickets,id',
                    'type_payment_id' => 'required|integer|exists:type_payments,id'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'ticket_id'=>'required|integer|exists:tickets,id',
                    'type_payment_id'=>'required|integer|exists:type_payments,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'ticket_id'=>'integer|exists:tickets,id',
                    'type_payment_id'=>'integer|exists:type_payments,id'
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
