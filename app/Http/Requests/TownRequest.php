<?php

namespace App\Http\Requests;

class TownRequest extends Request
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
                    'country_id' => 'required|integer|exists:countries,id'
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
                    'country_id'=>'required|integer|exists:countries,id'
                ];
            }
            case 'PUT':
            {
                return [
                    'name'=>'max:255',
                    'country_id'=>'integer|exists:countries,id'
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
