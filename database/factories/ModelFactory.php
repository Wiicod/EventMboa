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

use App\Adress;
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
use App\MobileReceiver;
use App\Organizer;
use App\Participant;
use App\Person;
use App\Publicity;
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

$factory->define(Adress::class, function (Faker\Generator $faker) {
    $town = FactoryHelper::getOrCreate(Town::class);
    return [
        'name' => $faker->address,
        'street' => $faker->streetName,
        'post_box' => $faker->postcode,
        'town_id' => $town->id,

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

    $adress = FactoryHelper::getOrCreate(Adress::class);
    $ticket = FactoryHelper::getOrCreate(Ticket::class);
    return [
        'adress_id' => $adress->id,
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

    $image = FactoryHelper::fakeFile($faker, 'event_type');
    return [
        'name' => $faker->name,
        'description' => $faker->text,
        'image' => $image
    ];

});

$factory->define(Event::class, function (Faker\Generator $faker) {

    $banner = FactoryHelper::fakeFile($faker, 'event');
    $user = FactoryHelper::getOrCreate(User::class);
    $organizer = FactoryHelper::getOrCreate(Organizer::class);
    $event_topic = FactoryHelper::getOrCreate(EventTopic::class);
    $event_type = FactoryHelper::getOrCreate(EventType::class);
    $adress = FactoryHelper::getOrCreate(Adress::class);

    return [
        'user_id' => $user->id,
        'organizer_id' => $organizer->id,
        'event_topic_id' => $event_topic->id,
        'event_type_id' => $event_type->id,
        'name' => $faker->name,
        'description' => $faker->text,
        'start_date' => $faker->dateTime,
        'end_date' => $faker->dateTime,
        'recurring' => $faker->name,
        'banner_picture' => $banner,
        'status' => rand(0, count(Event::$Status) - 1),
        'adress_id' => $adress->id,
    ];

});

$factory->define(Help::class, function (Faker\Generator $faker) {

    return [
        'title' => $faker->title,
        'description' => $faker->text,
    ];

});

$factory->define(IntrestedEvent::class, function (Faker\Generator $faker) {

    $user = FactoryHelper::getOrCreate(User::class, true);
    $event = FactoryHelper::getOrCreate(Event::class);
    return [
        'user_id' => $user->id,
        'event_id' => $event->id
    ];

});

$factory->define(MobileReceiver::class, function (Faker\Generator $faker) {

    $country = FactoryHelper::getOrCreate(Country::class);
    return [
        'country_id' => $country->id,
        'phone' => $faker->phoneNumber,
    ];

});

$factory->define(Organizer::class, function (Faker\Generator $faker) {

    $image = FactoryHelper::fakeFile($faker, 'organizer');
    $user = FactoryHelper::getOrCreate(User::class);
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'description' => $faker->text,
        'image' => $image,
        'linkedin' => $faker->url,
        'facebook' => $faker->url,
        'twitter' => $faker->url,
        'instagram' => $faker->url,
        'google' => $faker->url,
        'web_site' => $faker->url,
        'user_id' => $user->id

    ];

});

$factory->define(Participant::class, function (Faker\Generator $faker) {

    $user = FactoryHelper::getOrCreate(User::class, true);
    $ticket = FactoryHelper::getOrCreate(Ticket::class);
    return [
        'user_id' => $user->id,
        'ticket_id' => $ticket->id,
        'name' => $faker->name,
        'phone' => $faker->phoneNumber,
        'email' => $faker->email,
        'number' => rand(1, 5),
        'status' => rand(0, count(Participant::$Status) - 1),
    ];

});

$factory->define(Person::class, function (Faker\Generator $faker) {

    $user = FactoryHelper::getOrCreate(User::class, true);
    $adress = FactoryHelper::getOrCreate(Adress::class, true);
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
        'web_site' => $faker->url,
        'sex' => $faker->boolean(),
        'adress_id' => $adress->id

    ];

});

$factory->define(Publicity::class, function (Faker\Generator $faker) {

    $banner = FactoryHelper::fakeFile($faker, 'publicity');

    return [
        'title' => $faker->title,
        'status' => $faker->name,
        'type' => $faker->name,
        'company' => $faker->company,
        'web_site' => $faker->url,
        'url' => $faker->url,
        'description' => $faker->text(500),
        'banner_picture' => $banner,
        'start_date' => $faker->dateTime,
        'end_date' => $faker->dateTime
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
        'listing_privity' => rand(0, count(Ticket::$ListingPrivity) - 1)
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

