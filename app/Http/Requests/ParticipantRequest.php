<?php

namespace App\Http\Requests;

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
                return [
                    'number' => 'required|integer',
                    'name' => 'max:255|required_with:email,phone',
                    'phone' => 'required_with:email,name|max:255|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|',
                    'email' => 'max:255|email|required_with:name,phone',
                    'user_id' => 'required_without:name,phone,email|integer|exists:users,id',
                    'ticket_id' => 'required|integer|exists:tickets,id'
                ];
            }
            case 'DELETE':
            {
                return [];
            }
            case 'POST':
            {
                return [
                    'number'=>'required|integer',
                    'name' => 'max:255|required_with:email,phone',
                    'phone' => 'required_with:email,name|max:255|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|',
                    'email' => 'max:255|email|required_with:name,phone',
                    'user_id' => 'required_without:name,phone,email|integer|exists:users,id',
                    'ticket_id'=>'required|integer|exists:tickets,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'number'=>'integer',
                    'name' => 'max:255|required_with:email,phone',
                    'phone' => 'required_with:email,name|max:255|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|',
                    'email' => 'max:255|email|required_with:name,phone',
                    'user_id' => 'required_without:name,phone,email|integer|exists:users,id',
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
