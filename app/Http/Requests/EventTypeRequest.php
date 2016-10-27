<?php

namespace App\Http\Requests;

class EventTypeRequest extends Request
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
                    'description' => 'required',
                    'image' => 'image',
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
                    'description' => 'required',
                    'image' => 'image',
                ];
            }
            case 'PUT':
            {
                return [
                    'name'=>'max:255',
                    'description' => '',
                    'image' => 'image',
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
