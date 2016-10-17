<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

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
                    'number'=>'required|integer',
                    'user_id'=>'required|integer|exists:users,id',
                    'ticket_id'=>'required|integer|exists:tickets,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'number'=>'integer',
                    'user_id'=>'integer|exists:users,id',
                    'ticket_id'=>'integer|exists:tickets,id'
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
