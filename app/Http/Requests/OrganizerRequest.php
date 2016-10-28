<?php

namespace App\Http\Requests;

class OrganizerRequest extends Request
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
                    'image' => 'required|image',
                    'linkedin' => 'url|max:255',
                    'facebook' => 'url|max:255',
                    'google' => 'url|max:255',
                    'instagram' => 'url|max:255',
                    'twitter' => 'url|max:255',
                    'web_site' => 'url|max:255',
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
                    'description'=>'required',
                    'image'=>'required|image',
                    'linkedin'=>'url|max:255',
                    'facebook'=>'url|max:255',
                    'google'=>'url|max:255',
                    'instagram'=>'url|max:255',
                    'twitter'=>'url|max:255',
                    'web_site'=>'url|max:255',
                    'user_id' => 'required|integer|exists:users,id',
                ];
            }
            case 'PUT':
            {
                return [
                    'name'=>'max:255',
                    'description'=>'',
                    'image'=>'image',
                    'linkedin'=>'url|max:255',
                    'facebook'=>'url|max:255',
                    'google'=>'url|max:255',
                    'instagram'=>'url|max:255',
                    'twitter'=>'url|max:255',
                    'web_site'=>'url|max:255',
                    'user_id' => 'integer|exists:users,id',
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
