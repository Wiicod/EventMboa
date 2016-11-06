<?php

namespace App\Http\Requests;

class PublicityRequest extends Request
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
                    'title' => 'required|max:255',
                    'status' => 'required|max:255',
                    'type' => 'required|max:255',
                    'company' => 'required|max:255',
                    'banner_picture' => 'image',
                    'description' => 'required',
                    'url' => 'required|url',
                    'web_site' => 'url',
                    'start_date' => 'required|date|date_format:"Y-m-d H:i:s"|before:end_date',
                    'end_date' => 'required|date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'DELETE': {
                return [

                ];
            }
            case 'POST': {
                return [
                    'title' => 'required|max:255',
                    'status' => 'required|max:255',
                    'type' => 'required|max:255',
                    'company' => 'required|max:255',
                    'banner_picture' => 'image',
                    'description' => 'required',
                    'url' => 'required|url',
                    'web_site' => 'url',
                    'start_date' => 'required|date|date_format:"Y-m-d H:i:s"|before:end_date',
                    'end_date' => 'required|date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'PUT': {
                return [
                    'title' => 'max:255',
                    'status' => 'max:255',
                    'type' => 'max:255',
                    'company' => 'max:255',
                    'banner_picture' => 'image',
                    'description' => '',
                    'url' => 'url',
                    'web_site' => 'url',
                    'start_date' => 'date|date_format:"Y-m-d H:i:s"|before:end_date',
                    'end_date' => 'date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'PATCH': {
                return [
                ];
            }
            default:
                break;
        }
    }
}
