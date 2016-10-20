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
    return view('welcome');
});

Route::auth();

Route::group(['prefix' => '/api', 'middleware' => ['web']], function () {

    Route::resource('contact', 'ContactController');
    Route::resource('country', 'CountryController');
    Route::resource('distribution_point', 'DistributionPointController');
    Route::resource('event', 'EventController');
    Route::resource('event_link', 'EventLinkController');
    Route::resource('event_topic', 'EventTopicController');
    Route::resource('event_type', 'EventTypeController');
    Route::resource('help', 'HelpController');
    Route::resource('interested_event', 'IntrestedEventController');
    Route::resource('organizer', 'OrganizerController');
    Route::resource('participant', 'ParticipantController');
    Route::resource('person', 'PersonController');
    Route::resource('ticket', 'TicketController');
    Route::resource('ticket_type_payment', 'TicketTypePaymentController');
    Route::resource('town', 'TownController');
    Route::resource('type_payment', 'TypePaymentController');
    Route::resource('user', 'UserController');
    /*Route::post('refresh','AuthenticateController@refreshToken' 'jwt.auth');
    Route::get('user-token','AuthenticateController@getAuthenticatedUser');*/

});
