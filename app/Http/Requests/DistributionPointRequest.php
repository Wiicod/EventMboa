<?php

namespace App\Http\Requests;

class DistributionPointRequest extends Request
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
                    'town_id' => 'required|integer|exists:towns,id',
                    'ticket_id' => 'required|integer|exists:tickets,id',
                    'name' => 'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'town_id'=>'required|integer|exists:towns,id',
                    'ticket_id'=>'required|integer|exists:tickets,id',
                    'name'=>'required|max:255',
                    'date' => 'required|date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'PUT':
            {
                return [
                    'town_id'=>'integer|exists:towns,id',
                    'ticket_id'=>'integer|exists:tickets,id',
                    'name'=>'max:255',
                    'date' => 'date|date_format:"Y-m-d H:i:s"'
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
