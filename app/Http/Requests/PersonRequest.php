<?php

namespace App\Http\Requests;

class PersonRequest extends Request
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
                    'first_name' => 'required|max:255',
                    'last_name' => 'required|max:255',
                    'user_id' => 'required|integer|exists:users,id',
                    'home_phone' => 'required|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|max:255',
                    'cell_phone' => 'required|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|max:255',
                    'birthdate' => 'required|date|date_format:"Y-m-d H:i:s"',
                    'picture' => 'image',
                    'facebook' => 'url|max:255',
                    'twitter' => 'url|max:255',
                    'instagram' => 'url|max:255',
                    'google' => 'url|max:255',
                    'linked' => 'url|max:255',
                    'sex' => 'required|max:1',
                    'web_site' => 'url',
                    'adress_id' => 'required|integer|exists:adresses,id',
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
                    'user_id'=>'required|integer|exists:users,id',
                    'home_phone'=>'required|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|max:255',
                    'cell_phone'=>'required|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|max:255',
                    'birthdate' => 'required|date|date_format:"Y-m-d H:i:s"',
                    'picture'=>'image',
                    'facebook'=>'url|max:255',
                    'twitter'=>'url|max:255',
                    'instagram'=>'url|max:255',
                    'google'=>'url|max:255',
                    'linked'=>'url|max:255',
                    'sex' => 'required|max:1',
                    'web_site' => 'url|max:255',
                    'adress_id' => 'required|integer|exists:adresses,id',
                ];
            }
            case 'PUT':
            {
                return [
                    'first_name'=>'max:255',
                    'last_name'=>'max:255',
                    'user_id'=>'integer|exists:users,id',
                    'home_phone'=>'regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|max:255',
                    'cell_phone'=>'regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/|max:255',
                    'birthdate' => 'date|date_format:"Y-m-d H:i:s"',
                    'picture'=>'image',
                    'facebook'=>'url|max:255',
                    'twitter'=>'url|max:255',
                    'instagram'=>'url|max:255',
                    'google'=>'url|max:255',
                    'linked'=>'url|max:255',
                    'sex' => 'max:1',
                    'web_site' => 'url|max:255',
                    'adress_id' => 'integer|exists:adresses,id',
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
