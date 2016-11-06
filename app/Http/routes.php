<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', function () {
    return view('index');
});

Route::get('/img/{model}/{image}', function ($model, $image) {

    //do so other checks here if you wish


    $filename = "img/" . $model . "/" . $image;

    if (!Storage::has($filename)) abort(404);
    $path = storage_path('app/') . $filename;
    $file = Storage::get($filename);
    //$type = File::mimeType($path);
    $type = "image/jpeg";
    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);
    return $response;

    //return Storage::get("stock-images/".$type."/".$image); //will ensure a jpg is always returned
});

Route::group(['prefix' => '/api', 'middleware' => ['web']], function () {

//    Route::post('/register','AuthenticateController@register');
    Route::post('/signup', 'AuthenticateController@signup');
    Route::post('/signin', 'AuthenticateController@signin');

    Route::get('/event', 'EventController@index');
    Route::get('/event/{event}', 'EventController@show');
    Route::get('/event_topic', 'EventTopicController@index');
    Route::get('/event_type', 'EventTypeController@index');
    Route::resource('town', 'TownController');
    Route::resource('country', 'CountryController');
    Route::resource('help', 'HelpController');
    Route::resource('adress', 'AdressController');
});


Route::group(['prefix' => '/api', 'middleware' => ['web', 'jwt.auth']], function () {

    Route::get('/refresh', 'AuthenticateController@refreshToken');
    Route::get('authenticated-user', 'AuthenticateController@get_authenticated_user');


    Route::put('/event/{event}', 'EventController@update');
    Route::delete('event/{event}', 'EventController@destroy');
    Route::post('event', 'EventController@store');

    Route::resource('contact', 'ContactController');
//    Route::resource('country', 'CountryController');
    Route::resource('distribution_point', 'DistributionPointController');
//    Route::resource('event', 'EventController');
    Route::resource('event_link', 'EventLinkController');
//    Route::resource('event_topic', 'EventTopicController');
//    Route::resource('event_type', 'EventTypeController');

    Route::resource('intrested_event', 'IntrestedEventController');
    Route::resource('publicity', 'PublicityController');
    Route::resource('organizer', 'OrganizerController');
    Route::resource('participant', 'ParticipantController');
    Route::resource('person', 'PersonController');
    Route::resource('ticket', 'TicketController');
    Route::resource('ticket_type_payment', 'TicketTypePaymentController');

    Route::resource('type_payment', 'TypePaymentController');
    Route::resource('user', 'UserController');


});
