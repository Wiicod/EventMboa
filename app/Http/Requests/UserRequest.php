<?php

namespace App\Http\Requests;

class UserRequest extends Request
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
                    'password' => 'required|max:255',
                    'email' => 'required|email|unique:contacts|max:255',
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'password'=>'required|max:255',
                    'email'=>'required|email|unique:contacts|max:255',
                ];
            }
            case 'PUT':
            {
                return [
                    'password'=>'max:255',
                    'email'=>'email|unique:contacts|max:255',
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
