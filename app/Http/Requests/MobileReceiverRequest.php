<?php

namespace App\Http\Requests;

class MobileReceiverRequest extends Request
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
        switch ($this->method()) {
            case 'GET': {
                return [
                    'phone' => 'required|unique:mobile_receivers|max:255',
                    'country_id' => 'required|integer|exists:countries,id',
                    'type_payment_id' => 'required|integer|exists:type_payments,id'
                ];
            }
            case 'DELETE': {
                return [];
            }
            case 'POST': {
                return [
                    'phone' => 'required|unique:mobile_receivers|max:255',
                    'country_id' => 'required|integer|exists:countries,id',
                    'type_payment_id' => 'required|integer|exists:type_payments,id'
                ];
            }
            case 'PUT': {
                return [
                    'phone' => 'unique:mobile_receivers|max:255',
                    'country_id' => 'integer|exists:countries,id',
                    'type_payment_id' => 'integer|exists:type_payments,id'
                ];
            }
            case 'PATCH': {
                return [
                ];
            }
            default:
                break;
        }
    }
}
