<?php

namespace App\Http\Requests;

class EventLinkRequest extends Request
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
                    'name' => 'required|max:255',
                    'url' => 'required|url|max:255',
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
                    'name'=>'required|max:255',
                    'url'=>'required|url|max:255',
                    'event_id'=>'required|integer|exists:events,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'name'=>'max:255',
                    'url'=>'url|max:255',
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
