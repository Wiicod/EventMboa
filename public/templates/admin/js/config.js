/**
 * Created by Thedward on 10/08/2016.
 */

baseUrl = 'http://' + location.host + '/api/';

config.config(['NgAdminConfigurationProvider', 'ngAdminJWTAuthConfiguratorProvider',
    function (nga, ngAdminJWTAuthConfigurator) {

        //var nga = NgAdminConfigurationProvider;
        ngAdminJWTAuthConfigurator.setJWTAuthURL(baseUrl + 'signin');
        ngAdminJWTAuthConfigurator.setCustomAuthHeader({
            name: 'Authorization',
            template: 'Bearer {{token}}'
        });

        var admin = nga.application('Event Mboa Administration')
            .baseApiUrl(baseUrl); // main API endpoint

        // routes
        var event = nga.entity('event').label("Evénement");
        var event_topic = nga.entity('event_topic').label("Catégorie");
        var event_type = nga.entity('event_type').label("Type");
        var adress = nga.entity('adress').label("Adresse");
        var organizer = nga.entity('organizer').label("Organisateur");
        var user = nga.entity('user').label("Utilisateur");
        var town = nga.entity('town').label("Ville");
        var country = nga.entity('country').label("Pays");
        var contact = nga.entity('contact').label("Contact");
        var aide = nga.entity('help').label("Aide");
        var intrested_event = nga.entity('intrested_event').label("Sauvegardé");
        var distribution_point = nga.entity('distribution_point').label("Points de distributions");
        var mobile_recievers = nga.entity('mobile_receiver').label("Orange Money");
        var participants = nga.entity('participant').label("Client");
        var ticket = nga.entity('ticket').label("Billet");
        var person = nga.entity('person').label("Personne");
        var publicite = nga.entity('publicity').label("Publicité");
        var ticket_type_payment = nga.entity('ticket_type_payment').label("Mode de paiement");
        var type_payment = nga.entity('type_payment').label("Mode de paiement");

        var label_event = nga.entity('event').label("Evénements & options");
        var label_pays = nga.entity('country').label("Pays, Ville, Adresse");
        var label_utilisateur = nga.entity('user').label("Organisateur, Personne, Utilisateur");

        event.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Titre"),
                nga.field('description'),
                //nga.field('banner_picture').label("Image"),
                nga.field('start_date').label("Debut"),
                nga.field('end_date').label("Fin"),
                nga.field('event_topic_id', 'reference')
                    .targetEntity(event_topic)
                    .targetField(nga.field('name'))
                    .label('Catégorie'),
                nga.field('event_type_id', 'reference')
                    .targetEntity(event_type)
                    .targetField(nga.field('name'))
                    .label('Type'),
                nga.field('adress_id', 'reference')
                    .targetEntity(adress)
                    .targetField(nga.field('name'))
                    .label('Adresse'),
                nga.field('organizer_id', 'reference')
                    .targetEntity(organizer)
                    .targetField(nga.field('name'))
                    .label('Organisateur'),
                nga.field('status').label("Statut"),
                //nga.field('reccuring').label("Reccurent"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        event.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('description'),
            nga.field('banner_picture').label("Image"),
            nga.field('start_date').label("Debut"),
            nga.field('end_date').label("Fin"),
            nga.field('event_topic_id', 'reference')
                .targetEntity(event_topic)
                .targetField(nga.field('name'))
                .label('Catégorie'),
            nga.field('event_type_id', 'reference')
                .targetEntity(event_type)
                .targetField(nga.field('name'))
                .label('Type'),
            nga.field('adress_id', 'reference')
                .targetEntity(adress)
                .targetField(nga.field('name'))
                .label('Adresse'),
            nga.field('organizer_id', 'reference')
                .targetEntity(organizer)
                .targetField(nga.field('name'))
                .label('Organisateur'),
            nga.field('status').label("Statut")
        ]);

        event.creationView().fields([
            nga.field('id'),
            nga.field('name').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('description'),
            nga.field('banner_picture').label("Image"),
            nga.field('start_date').label("Debut").validation({required: true}),
            nga.field('end_date').label("Fin").validation({required: true}),
            nga.field('event_topic_id', 'reference')
                .targetEntity(event_topic)
                .targetField(nga.field('name'))
                .label('Catégorie'),
            nga.field('event_type_id', 'reference')
                .targetEntity(event_type)
                .targetField(nga.field('name'))
                .label('Type'),
            nga.field('adress_id', 'reference')
                .targetEntity(adress)
                .targetField(nga.field('name'))
                .label('Adresse'),
            nga.field('organizer_id', 'reference')
                .targetEntity(organizer)
                .targetField(nga.field('name'))
                .label('Organisateur'),
            nga.field('status').label("Statut")
        ]);
        //event.creationView().fields([
        //    nga.field('name')
        //        .validation({ required: true, minlength: 3, maxlength: 100 }),
        //    nga.field('eventname')
        //        .attributes({ placeholder: 'No space allowed, 5 chars min' })
        //        .validation({ required: true, pattern: '[A-Za-z0-9\.\-_]{5,20}' }),
        //    nga.field('email', 'email')
        //        .validation({ required: true }),
        //    nga.field('address.street')
        //        .label('Street'),
        //    nga.field('address.city')
        //        .label('City'),
        //    nga.field('address.zipcode')
        //        .label('Zipcode')
        //        .validation({ pattern: '[A-Z\-0-9]{5,10}' }),
        //    nga.field('phone'),
        //    nga.field('website')
        //        .validation({ validator: function(value) {
        //            if (value.indexOf('http://') !== 0) throw new Error ('Invalid url in website');
        //        } })
        //]);
        event.editionView().fields(event.creationView().fields());

        admin.addEntity(event);

        // type
        admin.addEntity(event_type);
        event_type.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Titre"),
                nga.field('description').label("Description"),
                nga.field('image').label("Image"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        event_type.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('image').label("Image"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        event_type.creationView().fields([
            nga.field('id'),
            nga.field('name').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('description').label("Description"),
            nga.field('image').label("Image")
        ]);
        event_type.editionView().fields(event_type.creationView().fields());
        // type
        admin.addEntity(distribution_point);
        distribution_point.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Nom"),
                nga.field('date').label("Date de distribution"),
                nga.field('ticket_id', 'reference')
                    .targetEntity(ticket)
                    .targetField(nga.field('name'))
                    .label('Ticket'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        distribution_point.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('image').label("Image"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        distribution_point.creationView().fields([
            nga.field('id'),
            nga.field('name').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('description').label("Description"),
            nga.field('image').label("Image")
        ]);
        distribution_point.editionView().fields(distribution_point.creationView().fields());


        // contact
        admin.addEntity(contact);
        contact.listView()
            .fields([
                nga.field('id'),
                nga.field('first_name').label("Prénoms"),
                nga.field('last_name').label("Noms"),
                nga.field('email').label("Email"),
                nga.field('user_id', 'reference')
                    .targetEntity(user)
                    .targetField(nga.field('email'))
                    .label('Utilisateur'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        contact.showView().fields([
            nga.field('id'),
            nga.field('first_name').label("Prénoms"),
            nga.field('last_name').label("Noms"),
            nga.field('email').label("Email"),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Utilisateur'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        contact.creationView().fields([
            nga.field('first_name').label("Prénoms").validation({required: true}),
            nga.field('last_name').label("Noms").validation({required: true}),
            nga.field('email').label("Email").validation({required: true}),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Utilisateur')
        ]);
        contact.editionView().fields(contact.creationView().fields());
        // Ville
        admin.addEntity(town);
        town.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Titre"),
                nga.field('country_id', 'reference')
                    .targetEntity(country)
                    .targetField(nga.field('name'))
                    .label('Pays'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete'])
            .sortField('name')
            .sortDir('ASC')
        ;

        town.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('country_id', 'reference')
                .targetEntity(country)
                .targetField(nga.field('name'))
                .label('Pays'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        town.creationView().fields([
            nga.field('id'),
            nga.field('name').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('country_id', 'reference')
                .targetEntity(country)
                .targetField(nga.field('name'))
                .label('Pays')
        ]);
        town.editionView().fields(town.creationView().fields());
        // Adresses
        admin.addEntity(adress);
        adress.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Nom"),
                nga.field('street').label("Rue"),
                nga.field('post_box').label("Boîte postale"),
                nga.field('town_id', 'reference')
                    .targetEntity(town)
                    .targetField(nga.field('name'))
                    .label('Ville'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete'])
            .sortField('id')
            .sortDir('ASC')
        ;

        adress.showView().fields([
            nga.field('id'),
            nga.field('name').label("Nom"),
            nga.field('street').label("Rue"),
            nga.field('post_box').label("Boîte postale"),
            nga.field('town_id', 'reference')
                .targetEntity(town)
                .targetField(nga.field('name'))
                .label('Ville'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        adress.creationView().fields([
            nga.field('id'),
            nga.field('name').label("Nom").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('street').label("Rue").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('post_box').label("Boîte postale").validation({required: true}),
            nga.field('town_id', 'reference')
                .targetEntity(town)
                .targetField(nga.field('name'))
                .label('Ville')
        ]);
        adress.editionView().fields(adress.creationView().fields());

        // organisateur
        admin.addEntity(organizer);
        organizer.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Titre"),
                nga.field('user_id', 'reference')
                    .targetEntity(user)
                    .targetField(nga.field('email'))
                    .label('Email utilisateur'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete'])
            .sortField('name')
            .sortDir('ASC')
        ;

        organizer.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('image'),
            nga.field('facebook'),
            nga.field('twitter'),
            nga.field('google'),
            nga.field('linkedin'),
            nga.field('instagram'),
            nga.field('web_site').label("Site web"),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Email utilisateur'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        organizer.creationView().fields([
            nga.field('id'),
            nga.field('name').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('description').label("Description"),
            nga.field('image'),
            nga.field('facebook'),
            nga.field('twitter'),
            nga.field('google'),
            nga.field('linkedin'),
            nga.field('instagram'),
            nga.field('web_site').label("Site web").validation({required: true}),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Email utilisateur')
                .validation({required: true, minlength: 3, maxlength: 100})
        ]);
        organizer.editionView().fields(organizer.creationView().fields());

        // User
        admin.addEntity(user);
        user.listView()
            .fields([
                nga.field('id'),
                nga.field('email').label("Email"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete'])
            .sortField('name')
            .sortDir('ASC')
        ;

        organizer.showView().fields([
            nga.field('id'),
            nga.field('email').label("Email"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        organizer.creationView().fields([
            nga.field('id'),
            nga.field('email').label("Email"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        // Pays
        admin.addEntity(country);
        country.listView()
            .fields([
                nga.field('id'),
                nga.field('capital').label("Capitale"),
                nga.field('citizenship').label("Nationalité"),
                nga.field('country_code').label("Code pays"),
                nga.field('currency').label("Monnaie"),
                nga.field('currency_code').label("Code monnaie"),
                nga.field('currency_sub_unit').label("Sous unité"),
                nga.field('currency_symbol').label("Unité"),
                nga.field('full_name').label("Nom complet"),
                nga.field('name').label("Nom"),
                nga.field('iso_3166_2').label("iso_3166_2"),
                nga.field('iso_3166_3').label("iso_3166_3"),
                nga.field('region_code').label("Code région"),
                nga.field('sub_region_code').label("Code sous région"),
                nga.field('eea').label("EEA"),
                nga.field('calling_code').label("Code d\'appelation"),
                nga.field('flag').label("Drapeau"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete'])
            .sortField('name')
            .sortDir('ASC')
        ;

        country.showView().fields([
            nga.field('id'),
            nga.field('capital').label("Capitale"),
            nga.field('citizenship').label("Nationalité"),
            nga.field('country_code').label("Code pays"),
            nga.field('currency').label("Monnaie"),
            nga.field('currency_code').label("Code monnaie"),
            nga.field('currency_sub_unit').label("Sous unité"),
            nga.field('currency_symbol').label("Unité"),
            nga.field('full_name').label("Nom complet"),
            nga.field('name').label("Nom"),
            nga.field('iso_3166_2').label("iso_3166_2"),
            nga.field('iso_3166_3').label("iso_3166_3"),
            nga.field('region_code').label("Code région"),
            nga.field('sub_region_code').label("Code sous région"),
            nga.field('eea').label("EEA"),
            nga.field('calling_code').label("Code d\'appelation"),
            nga.field('flag').label("Drapeau"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        country.creationView().fields([
            nga.field('capital').label("Capitale"),
            nga.field('citizenship').label("Nationalité"),
            nga.field('country_code').label("Code pays"),
            nga.field('currency').label("Monnaie"),
            nga.field('currency_code').label("Code monnaie"),
            nga.field('currency_sub_unit').label("Sous unité"),
            nga.field('currency_symbol').label("Unité"),
            nga.field('full_name').label("Nom complet"),
            nga.field('name').label("Nom"),
            nga.field('iso_3166_2').label("iso_3166_2"),
            nga.field('iso_3166_3').label("iso_3166_3"),
            nga.field('region_code').label("Code région"),
            nga.field('sub_region_code').label("Code sous région"),
            nga.field('eea').label("EEA"),
            nga.field('calling_code').label("Code d\'appelation"),
            nga.field('flag').label("Drapeau")
        ]);
        country.editionView().fields(country.creationView().fields());

        // Categories
        event_topic.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Titre"),
                nga.field('description').label("Description"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        event_topic.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        event_topic.creationView().fields([
            nga.field('name').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('description').label("Description")
        ]);
        event_topic.editionView().fields(event_topic.creationView().fields());
        admin.addEntity(event_topic);

        // Participant
        participants.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Nom"),
                nga.field('number').label("Quantité"),
                nga.field('phone').label("Téléphone"),
                nga.field('email').label("Email"),
                nga.field('user_id', 'reference')
                    .targetEntity(user)
                    .targetField(nga.field('email'))
                    .label('Email Utilisateur'),
                nga.field('ticket_id', 'reference')
                    .targetEntity(ticket)
                    .targetField(nga.field('title'))
                    .label('Titre du billet'),
                nga.field('status').label("Statut"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        participants.showView().fields([
            nga.field('id'),
            nga.field('name').label("Nom"),
            nga.field('number').label("Quantité"),
            nga.field('phone').label("Téléphone"),
            nga.field('email').label("Email"),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Email Utilisateur'),
            nga.field('user_id', 'reference')
                .targetEntity(ticket)
                .targetField(nga.field('email'))
                .label('Titre du billet'),
            nga.field('status').label("Statut"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        participants.creationView().fields([
            nga.field('name').label("Nom"),
            nga.field('number').label("Quantité"),
            nga.field('phone').label("Téléphone"),
            nga.field('email').label("Email"),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Email Utilisateur'),
            nga.field('user_id', 'reference')
                .targetEntity(ticket)
                .targetField(nga.field('email'))
                .label('Titre du billet'),
            nga.field('status').label("Statut")
        ]);
        participants.editionView().fields(participants.creationView().fields());
        admin.addEntity(participants);

        // Billet
        ticket.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Nom"),
                nga.field('description').label("Description"),
                nga.field('max_command').label("Commande max"),
                nga.field('quantity').label("Quantité"),
                nga.field('amount').label("Montant"),
                nga.field('start_date').label("Debut"),
                nga.field('end_date').label("Fin"),
                nga.field('listing_privacy').label("Liste privée"),
                nga.field('event_id', 'reference')
                    .targetEntity(event)
                    .targetField(nga.field('name'))
                    .label('Titre événeent'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        ticket.showView().fields([
            nga.field('id'),
            nga.field('name').label("Nom"),
            nga.field('description').label("Description"),
            nga.field('max_command').label("Commande max"),
            nga.field('quantity').label("Quantité"),
            nga.field('amount').label("Montant"),
            nga.field('start_date').label("Debut"),
            nga.field('end_date').label("Fin"),
            nga.field('listing_privacy').label("Liste privée"),
            nga.field('event_id', 'reference')
                .targetEntity(event)
                .targetField(nga.field('name'))
                .label('Titre événeent'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        ticket.creationView().fields([
            nga.field('name').label("Nom"),
            nga.field('description').label("Description"),
            nga.field('max_command').label("Commande max"),
            nga.field('quantity').label("Quantité"),
            nga.field('amount').label("Montant"),
            nga.field('start_date').label("Debut"),
            nga.field('end_date').label("Fin"),
            nga.field('listing_privacy').label("Liste privée"),
            nga.field('event_id', 'reference')
                .targetEntity(event)
                .targetField(nga.field('name'))
                .label('Titre événeent'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);
        ticket.editionView().fields(ticket.creationView().fields());
        admin.addEntity(ticket);

        // Interested_event
        intrested_event.listView()
            .fields([
                nga.field('id'),
                nga.field('user_id', 'reference')
                    .targetEntity(user)
                    .targetField(nga.field('email'))
                    .label('Email'),
                nga.field('event_id', 'reference')
                    .targetEntity(event)
                    .targetField(nga.field('name'))
                    .label('Evénement'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        intrested_event.showView().fields([
            nga.field('id'),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Email'),
            nga.field('event_id', 'reference')
                .targetEntity(event)
                .targetField(nga.field('name'))
                .label('Evénement'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        intrested_event.creationView().fields([
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('Email'),
            nga.field('event_id', 'reference')
                .targetEntity(event)
                .targetField(nga.field('name'))
                .label('Evénement')
        ]);
        intrested_event.editionView().fields(intrested_event.creationView().fields());
        admin.addEntity(intrested_event);

        // mobile_recievers
        mobile_recievers.listView()
            .fields([
                nga.field('id'),
                nga.field('phone').label("Téléphone"),
                nga.field('country_id', 'reference')
                    .targetEntity(country)
                    .targetField(nga.field('name'))
                    .label('Pays'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        mobile_recievers.showView().fields([
            nga.field('id'),
            nga.field('phone').label("Téléphone"),
            nga.field('country_id', 'reference')
                .targetEntity(country)
                .targetField(nga.field('name'))
                .label('Pays'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        mobile_recievers.creationView().fields([
            nga.field('phone').label("Téléphone"),
            nga.field('country_id', 'reference')
                .targetEntity(country)
                .targetField(nga.field('name'))
                .label('Pays')
        ]);
        mobile_recievers.editionView().fields(mobile_recievers.creationView().fields());
        admin.addEntity(mobile_recievers);

        // Mode de paiement
        type_payment.listView()
            .fields([
                nga.field('id'),
                nga.field('name').label("Titre"),
                nga.field('description').label("Description"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        type_payment.showView().fields([
            nga.field('id'),
            nga.field('name').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        type_payment.creationView().fields([
            nga.field('name').label("Titre"),
            nga.field('description').label("Description")
        ]);
        type_payment.editionView().fields(type_payment.creationView().fields());
        admin.addEntity(type_payment);

        // mobile_recievers
        mobile_recievers.listView()
            .fields([
                nga.field('id'),
                nga.field('phone').label("Téléphone"),
                nga.field('country_id', 'reference')
                    .targetEntity(country)
                    .targetField(nga.field('name'))
                    .label('Pays'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        mobile_recievers.showView().fields([
            nga.field('id'),
            nga.field('phone').label("Téléphone"),
            nga.field('country_id', 'reference')
                .targetEntity(country)
                .targetField(nga.field('name'))
                .label('Pays'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        mobile_recievers.creationView().fields([
            nga.field('phone').label("Téléphone"),
            nga.field('country_id', 'reference')
                .targetEntity(country)
                .targetField(nga.field('name'))
                .label('Pays')
        ]);
        mobile_recievers.editionView().fields(mobile_recievers.creationView().fields());
        admin.addEntity(mobile_recievers);

        // ticket_type_payment
        ticket_type_payment.listView()
            .fields([
                nga.field('id'),
                nga.field('ticket_id', 'reference')
                    .targetEntity(ticket)
                    .targetField(nga.field('name'))
                    .label('Titre du billet'),
                nga.field('type_payment', 'reference')
                    .targetEntity(type_payment)
                    .targetField(nga.field('name'))
                    .label('Mode de paiement'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        ticket_type_payment.showView().fields([
            nga.field('id'),
            nga.field('ticket_id', 'reference')
                .targetEntity(ticket)
                .targetField(nga.field('name'))
                .label('Titre du billet'),
            nga.field('type_payment', 'reference')
                .targetEntity(type_payment)
                .targetField(nga.field('name'))
                .label('Mode de paiement'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        ticket_type_payment.creationView().fields([
            nga.field('ticket_id', 'reference')
                .targetEntity(ticket)
                .targetField(nga.field('name'))
                .label('Titre du billet'),
            nga.field('type_payment', 'reference')
                .targetEntity(type_payment)
                .targetField(nga.field('name'))
                .label('Mode de paiement')
        ]);
        ticket_type_payment.editionView().fields(ticket_type_payment.creationView().fields());
        admin.addEntity(ticket_type_payment);

        // Person
        person.listView()
            .fields([
                nga.field('id'),
                nga.field('first_name').label("Prénom"),
                nga.field('last_name').label("Nom"),
                nga.field('home_phone').label("Téléphone"),
                nga.field('cell_phone').label("Portable"),
                nga.field('birthdate').label("Date de naissance"),
                nga.field('picture').label("Image"),
                nga.field('facebook').label("Facebook"),
                nga.field('twitter').label("Twitter"),
                nga.field('linkedin').label("LinkedIn"),
                nga.field('google').label("Google +"),
                nga.field('instragram').label("Instagram"),
                nga.field('sex').label("Sexe"),
                nga.field('web_site').label("Site web"),
                nga.field('user_id', 'reference')
                    .targetEntity(user)
                    .targetField(nga.field('email'))
                    .label('email utilisateur'),
                nga.field('adress_id', 'reference')
                    .targetEntity(adress)
                    .targetField(nga.field('name'))
                    .label('Adress'),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        person.showView().fields([
            nga.field('id'),
            nga.field('first_name').label("Prénom"),
            nga.field('last_name').label("Nom"),
            nga.field('home_phone').label("Téléphone"),
            nga.field('cell_phone').label("Portable"),
            nga.field('birthdate').label("Date de naissance"),
            nga.field('picture').label("Image"),
            nga.field('facebook').label("Facebook"),
            nga.field('twitter').label("Twitter"),
            nga.field('linkedin').label("LinkedIn"),
            nga.field('google').label("Google +"),
            nga.field('instragram').label("Instagram"),
            nga.field('sex').label("Sexe"),
            nga.field('web_site').label("Site web"),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('email utilisateur'),
            nga.field('adress_id', 'reference')
                .targetEntity(adress)
                .targetField(nga.field('name'))
                .label('Adress'),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        person.creationView().fields([
            nga.field('first_name').label("Prénom"),
            nga.field('last_name').label("Nom"),
            nga.field('home_phone').label("Téléphone"),
            nga.field('cell_phone').label("Portable"),
            nga.field('birthdate').label("Date de naissance"),
            nga.field('picture').label("Image"),
            nga.field('facebook').label("Facebook"),
            nga.field('twitter').label("Twitter"),
            nga.field('linkedin').label("LinkedIn"),
            nga.field('google').label("Google +"),
            nga.field('instragram').label("Instagram"),
            nga.field('sex').label("Sexe"),
            nga.field('web_site').label("Site web"),
            nga.field('user_id', 'reference')
                .targetEntity(user)
                .targetField(nga.field('email'))
                .label('email utilisateur'),
            nga.field('adress_id', 'reference')
                .targetEntity(adress)
                .targetField(nga.field('name'))
                .label('Adress')
        ]);
        person.editionView().fields(person.creationView().fields());
        admin.addEntity(person);

        // publicite
        publicite.listView()
            .fields([
                nga.field('id'),
                nga.field('title').label("Titre"),
                nga.field('description').label("Description"),
                nga.field('status').label("Statut"),
                nga.field('type').label("Type"),
                nga.field('company').label("Entreprise"),
                nga.field('banner_picture').label("Image"),
                nga.field('web_site').label("Site web"),
                nga.field('url').label("Lien"),
                nga.field('start_date').label("Debut"),
                nga.field('end_date').label("Fin"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        publicite.showView().fields([
            nga.field('id'),
            nga.field('title').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('status').label("Statut"),
            nga.field('type').label("Type"),
            nga.field('company').label("Entreprise"),
            nga.field('banner_picture').label("Image"),
            nga.field('web_site').label("Site web"),
            nga.field('url').label("Lien"),
            nga.field('start_date').label("Debut"),
            nga.field('end_date').label("Fin"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        publicite.creationView().fields([
            nga.field('title').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('status').label("Statut"),
            nga.field('type').label("Type"),
            nga.field('company').label("Entreprise"),
            nga.field('banner_picture').label("Image"),
            nga.field('web_site').label("Site web"),
            nga.field('url').label("Lien"),
            nga.field('start_date').label("Debut"),
            nga.field('end_date').label("Fin")
        ]);
        publicite.editionView().fields(publicite.creationView().fields());
        admin.addEntity(publicite);

        // Aide
        aide.listView()
            .fields([
                nga.field('id'),
                nga.field('title').label("Titre"),
                nga.field('description').label("Description"),
                nga.field('created_at').label("Créé le"),
                nga.field('updated_at').label("Modifié le")
            ])
            .listActions(['show', 'edit', 'delete']);

        aide.showView().fields([
            nga.field('id'),
            nga.field('title').label("Titre"),
            nga.field('description').label("Description"),
            nga.field('created_at').label("Créé le"),
            nga.field('updated_at').label("Modifié le")
        ]);

        aide.creationView().fields([
            nga.field('title').label("Titre").validation({required: true, minlength: 3, maxlength: 100}),
            nga.field('description').label("Description")
        ]);
        aide.editionView().fields(event_topic.creationView().fields());
        admin.addEntity(aide);

        // ajout des menus
        admin.menu(nga.menu()
            .addChild(nga.menu(label_event)
                .addChild(nga.menu(event))
                .addChild(nga.menu(ticket))
                .addChild(nga.menu(distribution_point))
                .addChild(nga.menu(event_topic))
                .addChild(nga.menu(event_type))
                .addChild(nga.menu(participants))
                .addChild(nga.menu(intrested_event))
                .addChild(nga.menu(type_payment))
            )
            .addChild(nga.menu(label_pays)
                .addChild(nga.menu(country))
                .addChild(nga.menu(town))
                .addChild(nga.menu(adress))
            )
            .addChild(nga.menu(label_utilisateur)
                .addChild(nga.menu(organizer))
                .addChild(nga.menu(person))
                .addChild(nga.menu(user))
                .addChild(nga.menu(contact))
            )
            .addChild(nga.menu(publicite))
            .addChild(nga.menu(mobile_recievers))
            .addChild(nga.menu(aide))
        );

        nga.configure(admin);
    }])
    .config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
            if (operation == "getList") {
                // custom pagination params
                if (params._page) {
                    params._start = (params._page - 1) * params._perPage;
                    params._end = params._page * params._perPage;
                }
                delete params._page;
                delete params._perPage;
                // custom sort params
                if (params._sortField) {
                    params._sort = params._sortField;
                    params._order = params._sortDir;
                    delete params._sortField;
                    delete params._sortDir;
                }
                // custom filters
                if (params._filters) {
                    for (var filter in params._filters) {
                        params[filter] = params._filters[filter];
                    }
                    delete params._filters;
                }
            }
            return { params: params };
        });
    }]);
