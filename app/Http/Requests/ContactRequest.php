<?php

namespace App\Http\Requests;

class ContactRequest extends Request
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
                    'firskt_name' => 'required|max:255',
                    'last_name' => 'required|max:255',
                    'email' => 'required|email|unique:contacts|max:255',
                    'user_id' => 'required|integer|exists:users,id'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {

                return [
                    'first_name'=>'required|max:255',
                    'last_name'=>'required|max:255',
                    'email'=>'required|email|unique:contacts|max:255',
                    'user_id'=>'required|integer|exists:users,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'first_name'=>'max:255',
                    'last_name'=>'max:255',
                    'email'=>'email|unique:contacts|max:255',
                    'user_id'=>'integer|exists:users,id'
                ];
            }
            case 'PATCH':
            {
                return [
                ];
            }
            default:
                return [
                    'first_name' => 'required|max:255',
                    'last_name' => 'required|max:255',
                    'email' => 'required|email|unique:contacts|max:255',
                    'user_id' => 'required|integer|exists:users,id'
                ];
        }
    }
}
