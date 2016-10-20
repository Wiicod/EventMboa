<?php

namespace App\Http\Requests;

class HelpRequest extends Request
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
                    'title' => 'required|max:255',
                    'description' => 'required'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'title'=>'required|max:255',
                    'description'=>'required'
                ];
            }
            case 'PUT':
            {
                return [
                    'title'=>'max:255',
                    'description'=>''
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
