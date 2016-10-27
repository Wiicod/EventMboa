<?php

namespace App\Http\Requests;

class EventRequest extends Request
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
                    'creator' => 'required|integer|exists:events,id',
                    'event_topic_id' => 'required|integer|exists:event_topics,id',
                    'event_type_id' => 'required|integer|exists:event_types,id',
                    'organizer_id' => 'integer|exists:organizers,id',
                    'town_id' => 'integer|exists:towns,id',
                    'name' => 'required|max:255',
                    'recurring' => 'required|max:255',
                    'banner_picture' => 'required|image',
                    'description' => 'required',
                    'start_date' => 'required|date|date_format:"Y-m-d H:i:s"',
                    'end_date' => 'required|date|date_format:"Y-m-d H:i:s"'
                ];
            }
            case 'DELETE': {
                return [

                ];
            }
            case 'POST':
            {
                return [
                    'creator'=>'required|integer|exists:events,id',
                    'event_topic_id'=>'required|integer|exists:event_topics,id',
                    'event_type_id'=>'required|integer|exists:event_types,id',
                    'organizer_id'=>'integer|exists:organizers,id',
                    'town_id' => 'integer|exists:towns,id',
                    'name'=>'required|max:255',
                    'recurring'=>'required|max:255',
                    'banner_picture'=>'required|image',
                    'description'=>'required',
                    'start_date' => 'required|date|date_format:"Y-m-d H:i:s"',
                    'end_date' => 'required|date|date_format:"Y-m-d H:i:s"'

                ];
            }
            case 'PUT':
            {
                return [
                    'creator'=>'integer|exists:events,id',
                    'event_topic_id'=>'integer|exists:event_topics,id',
                    'event_type_id'=>'integer|exists:event_types,id',
                    'organizer_id'=>'integer|exists:organizers,id',
                    'town_id' => 'integer|exists:towns,id',
                    'name'=>'max:255',
                    'recurring'=>'max:255',
                    'banner_picture'=>'image',
                    'start_date' => 'date|date_format:"Y-m-d H:i:s"',
                    'end_date' => 'date|date_format:"Y-m-d H:i:s"'

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
