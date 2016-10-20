<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

use App\Contact;
use App\Country;
use App\DistributionPoint;
use App\Event;
use App\EventLink;
use App\EventTopic;
use App\EventType;
use App\Help;
use App\Helpers\FactoryHelper;
use App\IntrestedEvent;
use App\Organizer;
use App\Participant;
use App\Person;
use App\Ticket;
use App\TicketTypePayment;
use App\Town;
use App\TypePayment;
use App\User;

$factory->define(User::class, function (Faker\Generator $faker) {
    return [
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(Contact::class, function (Faker\Generator $faker) {
    $user = FactoryHelper::getOrCreate(User::class);
    return [
        'user_id' => $user->id,
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'email' => $faker->safeEmail,

    ];
});

$factory->define(DistributionPoint::class, function (Faker\Generator $faker) {

    $town = FactoryHelper::getOrCreate(Town::class);
    $ticket = FactoryHelper::getOrCreate(Ticket::class);
    return [
        'town_id' => $town->id,
        'ticket_id' => $ticket->id,
        'name' => $faker->name,
        'date' => $faker->dateTime,
    ];

});

$factory->define(EventLink::class, function (Faker\Generator $faker) {

    $event = FactoryHelper::getOrCreate(Event::class);
    return [
        'event_id' => $event->id,
        'url' => $faker->url,
        'name' => $faker->name
    ];

});

$factory->define(EventTopic::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'description' => $faker->text,
    ];

});

$factory->define(EventType::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'description' => $faker->text,
    ];

});

$factory->define(Event::class, function (Faker\Generator $faker) {

    $banner = FactoryHelper::fakeFile($faker, 'event');
    $user = FactoryHelper::getOrCreate(User::class);
    $organizer = FactoryHelper::getOrCreate(Organizer::class);
    $event_topic = FactoryHelper::getOrCreate(EventTopic::class);
    $event_type = FactoryHelper::getOrCreate(EventType::class);

    return [
        'creator' => $user->id,
        'organizer_id' => $organizer->id,
        'event_topic_id' => $event_topic->id,
        'event_type_id' => $event_type->id,
        'name' => $faker->name,
        'description' => $faker->text,
        'start_date' => $faker->dateTime,
        'end_date' => $faker->dateTime,
        'recurring' => $faker->name,
        'banner_picture' => $banner,
        'status' => rand(0, count(Event::$Status)),
    ];

});

$factory->define(Help::class, function (Faker\Generator $faker) {

    return [
        'title' => $faker->title,
        'description' => $faker->text,
    ];

});

$factory->define(IntrestedEvent::class, function (Faker\Generator $faker) {

    $user = FactoryHelper::getOrCreate(User::class);
    $event = FactoryHelper::getOrCreate(Event::class);
    return [
        'user_id' => $user->id,
        'event_id' => $event->id
    ];

});

$factory->define(Organizer::class, function (Faker\Generator $faker) {

    $image = FactoryHelper::fakeFile($faker, 'organizer');
    return [
        'name' => $faker->name,
        'description' => $faker->text,
        'image' => $image,
        'linkedin' => $faker->url,
        'facebook' => $faker->url,
        'twitter' => $faker->url,
        'instagram' => $faker->url,
        'google' => $faker->url,
        'web_site' => $faker->url

    ];

});

$factory->define(Participant::class, function (Faker\Generator $faker) {

    $user = FactoryHelper::getOrCreate(User::class);
    $ticket = FactoryHelper::getOrCreate(Ticket::class);
    return [
        'user_id' => $user->id,
        'ticket_id' => $ticket->id,
        'number' => rand(1, 5),
    ];

});

$factory->define(Person::class, function (Faker\Generator $faker) {

    $user = FactoryHelper::getOrCreate(User::class, true);
    $picture = FactoryHelper::fakeFile($faker, 'person');
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'user_id' => $user->id,
        'home_phone' => $faker->phoneNumber,
        'cell_phone' => $faker->phoneNumber,
        'birthdate' => $faker->date,
        'picture' => $picture,
        'linkedin' => $faker->url,
        'facebook' => $faker->url,
        'twitter' => $faker->url,
        'instagram' => $faker->url,
        'google' => $faker->url,

    ];

});

$factory->define(TicketTypePayment::class, function (Faker\Generator $faker) {

    $ticket = FactoryHelper::getOrCreate(Ticket::class);
    $type_payment = FactoryHelper::getOrCreate(TypePayment::class);
    return [
        'ticket_id' => $ticket->id,
        'type_payment_id' => $type_payment->id,
    ];

});

$factory->define(Ticket::class, function (Faker\Generator $faker) {

    $event = FactoryHelper::getOrCreate(Event::class);

    return [
        'event_id' => $event->id,
        'name' => $faker->name,
        'description' => $faker->text,
        'max_command' => rand(2, 10),
        'quantity' => rand(50, 200),
        'amount' => rand(10, 100) * 100,
        'start_date' => $faker->dateTime,
        'end_date' => $faker->dateTime,
        'listing_privity' => rand(0, count(Ticket::$ListingPrivity))
    ];

});

$factory->define(Town::class, function (Faker\Generator $faker) {

    $country = FactoryHelper::getOrCreate(Country::class);
    return [
        'country_id' => $country->id,
        'name' => $faker->city,
    ];

});

$factory->define(TypePayment::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'description' => $faker->text,
    ];

});

