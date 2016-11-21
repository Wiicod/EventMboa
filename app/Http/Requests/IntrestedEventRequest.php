<?php

namespace App\Http\Requests;

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
                return [
                    'user_id' => 'required|integer|exists:users,id|unique:intrested_events,user_id,event_id',
                    'event_id' => 'required|integer|exists:events,id'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'user_id' => 'required|integer|exists:users,id|unique_with:intrested_events,event_id,event_id',
                    'event_id'=>'required|integer|exists:events,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'user_id' => 'integer|exists:users,id|unique_with:intrested_events,event_id,event_id,' . $this->route()->getParameter('intrested_event'),
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
