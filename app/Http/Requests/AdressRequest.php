<?php

namespace App\Http\Requests;

class AdressRequest extends Request
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
        switch ($this->method()) {
            case 'GET': {
                return [
                    'name' => 'required|max:255',
                    'street' => 'required|max:255',
                    'post_box' => 'required|max:255',
                    'town_id' => 'integer|exists:towns,id'
                ];
            }
            case 'DELETE': {
                return [];
            }
            case 'POST': {

                return [
                    'name' => 'required|max:255',
                    'street' => 'required|max:255',
                    'post_box' => 'required|max:255',
                    'town_id' => 'integer|exists:towns,id'
                ];
            }
            case 'PUT': {
                return [
                    'name' => 'max:255',
                    'street' => 'max:255',
                    'post_box' => 'max:255',
                    'town_id' => 'integer|exists:towns,id'
                ];
            }
            case 'PATCH': {
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
