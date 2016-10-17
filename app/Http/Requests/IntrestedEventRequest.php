<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class IntrestedEventRequest extends Request
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
                    'user_id'=>'required|integer|exists:users,id',
                    'event_id'=>'required|integer|exists:events,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'user_id'=>'integer|exists:users,id',
                    'event_id'=>'integer|exists:events,id'
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
