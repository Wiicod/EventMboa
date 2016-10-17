<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

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
                return [];
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
                    'birthdate'=>'required|date|date_format:"d-m-Y"',
                    'picture'=>'required|image',
                    'facebook'=>'url|max:255',
                    'twitter'=>'url|max:255',
                    'instagram'=>'url|max:255',
                    'google'=>'url|max:255',
                    'linked'=>'url|max:255',
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
                    'birthdate'=>'date|date_format:"d-m-Y"',
                    'picture'=>'image',
                    'facebook'=>'url|max:255',
                    'twitter'=>'url|max:255',
                    'instagram'=>'url|max:255',
                    'google'=>'url|max:255',
                    'linked'=>'url|max:255',
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
