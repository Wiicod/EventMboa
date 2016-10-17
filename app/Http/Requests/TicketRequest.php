<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class TicketRequest extends Request
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
                return [];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'name'=>'required|max:255',
                    'listing_privity'=>'required|max:255',
                    'description'=>'required',
                    'amount'=>'required|numeric',
                    'quantity'=>'required|integer',
                    'max_command'=>'required|integer',
                    'event_id'=>'required|integer|exists:events,id',
                    'start_date'=>'required|date|date_format:"d-m-Y H:i:s"',
                    'end_date'=>'required|date|date_format:"d-m-Y H:i:s"'
                ];
            }
            case 'PUT':
            {
                return [
                    'name'=>'max:255',
                    'listing_privity'=>'max:255',
                    'description'=>'',
                    'amount'=>'numeric',
                    'quantity'=>'integer',
                    'max_command'=>'integer',
                    'event_id'=>'integer|exists:events,id',
                    'start_date'=>'date|date_format:"d-m-Y H:i:s"',
                    'end_date'=>'date|date_format:"d-m-Y H:i:s"'
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
