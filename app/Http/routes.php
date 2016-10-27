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

    if (!Storage::has($filename)) abort(403);
    $path = storage_path('app/') . $filename;
    $file = Storage::get($filename);

    //$type = Storage::mimeType($path);
    $f = new File($path);
    //$type = $f->getMimeType();
    $type="image/jpeg";
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
});


Route::group(['prefix' => '/api', 'middleware' => ['web', 'jwt.auth']], function () {

    Route::post('/refresh_token', 'AuthenticateController@signin');
    Route::get('authenticated-user', 'AuthenticateController@get_authenticated_user');

    Route::post('/create', 'EventController@store');
    Route::post('/delete', 'EventController@destroy');
    Route::post('/update', 'EventController@update');

    Route::resource('contact', 'ContactController');
//    Route::resource('country', 'CountryController');
    Route::resource('distribution_point', 'DistributionPointController');
//    Route::resource('event', 'EventController');
    Route::resource('event_link', 'EventLinkController');
//    Route::resource('event_topic', 'EventTopicController');
//    Route::resource('event_type', 'EventTypeController');

    Route::resource('interested_event', 'IntrestedEventController');
    Route::resource('organizer', 'OrganizerController');
    Route::resource('participant', 'ParticipantController');
    Route::resource('person', 'PersonController');
    Route::resource('ticket', 'TicketController');
    Route::resource('ticket_type_payment', 'TicketTypePaymentController');

    Route::resource('type_payment', 'TypePaymentController');
    Route::resource('user', 'UserController');


});
