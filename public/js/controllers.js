/**
 * Created by Thedward on 10/08/2016.
 */
controller
    .controller('AppCtrl',['$scope',function($scope){

    }])

    .controller('AuthCtrl', ['$scope', '$auth', '$state', '$stateParams', '$cookies', 'Restangular', '$rootScope',
        function ($scope, $auth, $state, $stateParams, $cookies, Restangular, $rootScope) {
        $scope.message="";

        $scope.signup = function () {
            $auth.signup($scope.auth).then(function (response) {
                // tu stocke xa dans le rootScope au cas ou !!!
                console.log(response.data.user);
                $auth.setToken(response.data.token);
                console.info('Signup  successfully.');
                Restangular.one('authenticated-user').get().then(function (data) {
                    $cookies.putObject("user", data.user, {path: '/'});
                });
                $state.go('home');

            }, function (error) {
                console.error(error);
            });
        };

        $scope.login = function () {
            $auth.login($scope.auth).then(function (response) {
                // tu stocke xa dans le rootScope au cas ou !!!
                var t = response.data.token;
                $auth.setToken(t);
                console.info('Logged in successfully.');
                if ($rootScope.next != undefined) {
                    $state.go($rootScope.next);
                } else {
                    $state.go('home');
                }
                Restangular.one('authenticated-user').get().then(function (data) {
                    $cookies.putObject("user", data.user, {path: '/'});
                });
            }, function (error) {
                console.error(error);
                $scope.message = "Paramètres de connexion invalides";
            });
        }

    }])

    .controller('CreateCtrl', ['$scope', '$filter', 'Restangular', '$cookies', function ($scope, $filter, Restangular, $cookies) {
        $scope.user = $cookies.getObject("user");
        $scope.message="";
        $scope.option="modifier";
        $scope.e={};
        $scope.e.confidentialite="Public";
        $scope.e.organisateur={};
        $scope.inclure=false;
        $scope.billets=[];
        $scope.organisateurs=organisateurs;

        Restangular.all('country').getList().then(function (data) {
            $scope.pays = data;
        });
        Restangular.all('event_topic').getList().then(function (data) {
            $scope.categories = data;
        });
        Restangular.all('event_type').getList().then(function (data) {
            $scope.types = data;
        });
        Restangular.all('organizer').getList({user_id: $scope.user.id}).then(function (o) {
            $scope.organisateurs = o;
        });

        $scope.uploadFiles = function (file) {
            console.log(file);
            $scope.fileData = file;
            var fd = new FormData();
            fd.append('file', file);
            Restangular.one('event').withHttpConfig({transformRequest: angular.identity})
                .customPOST(fd, '', undefined, {'Content-Type': undefined})
        };

        $scope.ajouter=function(type){
            $scope.type=type;
            $scope.billets.push({type:type,id:$scope.billets.length+1});
        };

        $scope.supprimer=function(billet){
          $scope.billets.splice($scope.billets.indexOf(billet),1);
        };

        $scope.choixBillet=function(b){
          $scope.billet_detail=b;
            console.log(b);
        };

        $scope.annuler=function(b){
            console.log(b);
            var id= b.id;
            var nom= b.nom;
            var type= b.type;
            var quantite= b.quantite;
            var prix= b.prix;
            $scope.billets.splice($scope.billets.indexOf(b),1);
            $scope.billets.push({id:id,type:type,nom:nom,quantite:quantite,prix:prix});
        };

        $scope.enregistrerEvenement=function(e){
          console.log(e);
        };

        $scope.$watch('e.organisateur.nom',function(){
            if($scope.e.organisateur.nom!=undefined)
                $scope.e.organisateur.description=$filter("filter")($scope.organisateurs,{id:$scope.e.organisateur.nom},true)[0].description;
        });

        // pour l'image
        $scope.upload = function (files) {
            if (files) {
                $scope.e.images=files;
            }
        };
        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $("#image_boutique").click(function(){
            $("#id_icone_boutique").click();
        });
        $("#id_icone_boutique").change(function(event){
            var tmppath = URL.createObjectURL(event.target.files[0]);
            $scope.upload(event.target.files[0]);
            $("#image").fadeIn("fast").attr("src",tmppath);
        });
        // fin image
    }])

    .controller('HeaderCtrl', ['$scope', '$auth', '$state', '$rootScope', '$cookies', 'Restangular', function ($scope, $auth, $state, $rootScope, $cookies, Restangular) {
        $scope.loguer = false;
        $scope.lieu = false;

        if ($state.current.name != 'home' && $state.current.name != "events" && $state.current.name != "login" && $state.current.name != "register") {
            $scope.lieu = true;
        }
        $scope.logout = function () {
            $auth.logout();
            $scope.loguer = false;
            $state.go('home');
        };

        $scope.create_event = function () {
            $rootScope.next = "create";
            $state.go('login');
        };

        $scope.searchEvent=function(key){
            console.log(key);
            $rootScope.searchKey = key;
            $state.go("events");
            // à faire
        };

        if ($auth.isAuthenticated() && $auth.getToken() != null) {
            $scope.loguer = true;

            if ($cookies.getObject("user") != undefined) {
                Restangular.all("interested_event").getList({user_id: $cookies.getObject("user").id}).then(function (event) {
                    $scope.save = 0;
                    $scope.billet = 0;
                    angular.forEach(event, function (e, k) {
                        if (e.event.status == "save") {
                            $scope.save++;
                        }
                        if (e.event.status == "active") {
                            $scope.billet++;
                        }
                    });
                });
            }
        } else {
            $scope.loguer = false;
        }
    }])

    .controller('FooterCtrl',['$scope',function($scope){
        $scope.currentDate=new Date();
        $scope.pays=pays;
        $scope.villes=villes;

    }])

    .controller('HomeCtrl', ['$scope', 'Restangular', '$rootScope', '$state', function ($scope, Restangular, $rootScope, $state) {
        Restangular.all('event_type').getList().then(function (data) {
            $scope.categories = data;
        }, function (err) {
            console.log(err);
        });
        $scope.date_deb = [];
        Restangular.all('event').getList().then(function (events) {
            //console.log(events[0]);
            var tm = [];
            angular.forEach(events, function (v, k) {
                v.id = parseInt(Math.random(1, 5) * 10000) + "" + v.id;
                var d = new Date(v.start_date);
                $scope.date_deb.push({
                    name: jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900),
                    value: v.start_date
                });
                v.date_debut = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
                d = new Date(v.end_date);
                v.date_fin = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
                Restangular.one('town', v.adress.town_id).get().then(function (data) {
                    v.town = data;
                });
                if (v.tickets.length > 0 && v.status == "active") {
                    tm.push(v);
                }
            });
            //console.log(tm);
            $scope.events = tm;
        }, function (err) {
            console.log(err);
        });

        $scope.search = function (s) {
            console.log(s);
            $rootScope.search = s;
            //if(s.titre!=""|| s.date!=null|| s.ville!="")
            $state.go("events");
        };

        $(function(){
            homeCarrousel();
            hoverPack();
        });
    }])

    .controller('EventCtrl', ['$scope', '$stateParams', '$rootScope', 'Restangular', '$filter', function ($scope, $stateParams, $rootScope, Restangular, $filter) {
        var id = $stateParams.id;
        var target = $stateParams.target;
        var se = $rootScope.search;
        // console.log(se);
        var searchKey = $rootScope.searchKey;
        console.log("Event", searchKey);
        $scope.categories = [];
        $scope.types = [];
        $scope.par_page = 12;
        // filtre avc undescore pour chercher suivant la categorie et le titre
        // example d utilisation de restangular c valable pour le post put delete regarde juste la doc
        //tu pouvais aussi utilise la factorie customize Event k j ai cree
        $scope.date_deb = [];

        Restangular.all('event_topic').getList().then(function (data) {
            $scope.categories = data;
        });
        Restangular.all('event_type').getList().then(function (data) {
            $scope.types = data;
        });
        Restangular.all('event').getList().then(function (events) {
            if (id != "" && target != "") {
                var out = _.filter(events, function (e) {
                    if (id == "topic") {
                        $scope.titre = "Recherche des événements suivant la catégorie <span class='blue'>'" + target + "'</span>";
                        if (e.event_topic.name == target) {
                            return e;
                        }
                    }
                    else if (id == 'type') {
                        $scope.titre = "Recherche des événements suivant le type <span class='blue'>'" + target + "'</span>";
                        if (e.event_type.name == target) {
                            return e;
                        }
                    }
                });
                events = out;
            }
            else if (se != undefined) {
                // rechercher
                var out = _.filter(events, function (e) {
                    if (e.name == se.titre || e.start_date == se.date || e.town.name == se.ville) {
                        return e;
                    }
                    else {

                    }
                });
            }
            else if (searchKey != undefined && searchKey != "") {
                $scope.titre = "Recherche des événements suivant le mot <span class='blue'>'" + target + "'</span>";
            }
            else {
                $scope.titre = "Evénements pour vous";
            }
            var tm = [];
            angular.forEach(events, function (v, k) {
                v.id = parseInt(Math.random(1, 5) * 10000) + "" + v.id;
                var d = new Date(v.start_date);
                $scope.date_deb.push({
                    name: jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900),
                    value: v.start_date
                });
                v.date_debut = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
                d = new Date(v.end_date);
                v.date_fin = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
                Restangular.one('town', v.adress.town_id).get().then(function (data) {
                    v.town = data;
                });
                if (v.tickets.length > 0 && v.status == "active") {
                    tm.push(v);
                }
            });
            $scope.searchKey = searchKey;
            $scope.events = tm;
        }, function (err) {
            console.log(err);
        });


        // $scope.events=events;
    }])

    .controller('DetailEventCtrl', ['$scope', '$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
        var nom = $stateParams.nom;
        var id = parseInt(nom.substring(nom.length - 1, nom.length));
        console.log(id);
        Restangular.one('event', id).get().then(function (data) {
            console.log(data);
            var t = data.banner_picture.substring(0, 10);
            t += "/" + data.banner_picture.substring(11, data.banner_picture.length);
            data.banner_picture = t;
            var d = new Date(data.start_date);
            data.date_debut = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
            d = new Date(data.end_date);
            data.date_fin = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
            Restangular.one('town', data.adress.town_id).get().then(function (t) {
                data.town = t;
            });
            $scope.event = data;
        }, function (err) {
            console.log(err);
        });
        $scope.qte = 0;


    }])

    .controller('MyEventCtrl', ['$scope', '$stateParams', '$filter', 'Restangular', '$cookies', function ($scope, $stateParams, $filter, Restangular, $cookies) {
        $scope.user = $cookies.getObject("user");

        var participants = Restangular.all("participant").getList();
        Restangular.all("event").getList({user_id: $scope.user.id}).then(function (data) {
            console.log(data);
            $scope.eventOnline = $filter("filter")(data, {status: "active"}, true);
            $scope.eventPassed = $filter("filter")(data, {status: "end"}, true);
            $scope.eventSaved = $filter("filter")(data, {status: "save"}, true);

            $scope.events = $scope.eventOnline;
            angular.forEach(data, function (e, k) {
                e.quantite_vendu = 0;
                e.quantite_total = 0;
                participants.then(function (p) {
                    $scope.participants = p;
                    //console.log($scope.event,$scope.participants);
                    angular.forEach(e.tickets, function (v, k) {
                        e.quantite_total += v.quantity;
                        var x = _.filter($scope.participants, function (p) {
                            if (v.id == p.ticket_id) {
                                e.quantite_vendu += p.number;
                                return p;
                            }
                        });
                        v.participant = x;
                    });
                });
            });
        });

        //$scope.eventOnlinse= _.filter($scope.data,function(e){
        //    if(e.status=="active"){
        //        return e;
        //    }
        //});
        //$scope.eventSave= _.filter($scope.data,function(e){
        //    if(e.status=="save"){
        //        return e;
        //    }
        //});
        //$scope.eventPassed= _.filter($scope.data,function(e){
        //    if(e.status=="end"){
        //        return e;
        //    }
        //});
        $scope.events=$scope.eventOnline;

        $scope.choixEvent=function(choix){
            console.log(choix);
            if (choix == 0) {
                $scope.events = $scope.eventOnline;
            } else if (choix == 1) {
                $scope.events = $scope.eventSaved;
            } else if (choix == 2) {
                $scope.events = $scope.eventPassed;
            }
        }

    }])

    .controller('BilletCtrl', ['$scope', '$state', '$filter', 'Restangular', '$cookies', function ($scope, $state, $filter, Restangular, $cookies) {

        Restangular.all("interested_event").getList({user_id: $cookies.getObject("user").id}).then(function (event) {
            $scope.eventOnline = [];
            $scope.eventPassed = [];
            $scope.eventSave = [];
            angular.forEach(event, function (e, k) {
                var d = new Date(e.event.start_date);
                e.event.date_debut = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
                if (e.event.status == "active") {
                    $scope.eventOnline.push(e.event);
                }
                else if (e.event.status == "end") {
                    $scope.eventPassed.push(e.event);
                }
                else if (e.event.status == "save") {
                    $scope.eventSave.push(e.event);
                }
            });
            if ($state.current.name == 'billet') {
                $scope.events = $scope.eventOnline;
                $scope.choix = "online";
            }
            else if ($state.current.name == "save") {
                $scope.events = $scope.eventSave;
                $scope.choix = "save";
            }
            else {
                $scope.events = $scope.eventPassed;
                $scope.choix = "passed";
            }
            $scope.par_page = 5;
        });


        $scope.choix = "";

        $scope.choixEvent=function(choix){
            if (choix == 0) {
                $scope.events = $scope.eventOnline;
            }
            if (choix == 2) {
                $scope.events = $scope.eventPassed;
            }
            if (choix == 1) {
                $scope.events = $scope.eventSave;
            }
        };

        $scope.choixBillet=function(b){
            $scope.billet=b;
            console.log(b);
        };

    }])

    .controller('ProfilCtrl', ['$scope', '$filter', 'Restangular', '$cookies', function ($scope, $filter, Restangular, $cookies) {
        $scope.user = $cookies.getObject("user");
        var organisateurs = Restangular.all("organizer");
        organisateurs.getList({user_id: $scope.user.id}).then(function (o) {
            $scope.organisateurs = o;
            console.log(o);
        });
        $scope.par_page = 5;
        $scope.organisateur={};
        $scope.user_event=undefined;
        $scope.no_image=true;

        $scope.click_im=function(){
            $("#im").trigger("click");
        };
        $scope.fileNameChanged=function(element){
            $scope.$apply(function() {
                $scope.organisateur.image = element.files[0];
            });
            $("#image").fadeIn("fast").attr("src", URL.createObjectURL($scope.organisateur.image));
            $scope.no_image = false;
        };

        $scope.enregistrerOrgansiateur=function(o){
            o.user_id = $scope.user.id;
            console.log(o);
            var fd = new FormData();
            fd.append('name', o.name);
            fd.append('description', o.description);
            fd.append('web_site', o.web_site);
            fd.append('user_id', o.user_id);
            fd.append('google', o.google);
            fd.append('twitter', o.twitter);
            fd.append('facebook', o.facebook);
            fd.append('instagram', o.instagram);
            fd.append('linkedin', o.linkedin);
            fd.append('image', o.image);
            console.log(fd);
            Restangular.one('organizer').withHttpConfig({transformRequest: angular.identity})
                .customPOST(fd, '', undefined, {'Content-Type': undefined});

            //console.log(organisateurs.post($scope.organisateur));
        };

        $scope.nouveauOrganisateur=function(){
            $scope.organisateur={};
        };

        $scope.choixOrganisateur = function (o) {
            $scope.organisateur = o;
            $(".close").trigger("click");
        };

        $scope.supprimer = function (o) {
            $scope.organisateurs.splice($scope.organisateurs.indexOf(o), 1);
            Restangular.one("organizer", o.id).get().then(function (og) {
                og.remove();
            });
        };
    }])

    .controller('CompteCtrl', ['$scope', '$filter', 'Restangular', '$state', '$cookies', function ($scope, $filter, Restangular, $state, $cookies) {
        $scope.compte = $cookies.getObject("user");
        Restangular.one("adress", $scope.compte.person.adress_id).get().then(function (a) {
            Restangular.one("country", a.town.country_id).get().then(function (c) {
                a.town.country = c;
            });
            $scope.compte.person.adress = a;
        });
        Restangular.all("country").getList().then(function (c) {
            $scope.pays = c;
        });
        console.log($scope.compte);
        var d = new Date($scope.compte.person.birthdate);
        $scope.compte.jour = d.getDate();
        $scope.compte.mois = d.getMonth() + 1;
        $scope.compte.annee = d.getYear() + 1900;
        $scope.email = $scope.compte.email;
        $scope.user_event=undefined;
        $scope.no_image=true;
        $scope.modMail=false;

        //$scope.annees=[];
        //$scope.mois=[
        //    {valeur:1,name:'Janvier'},
        //    {valeur:2,name:'Février'},
        //    {valeur:3,name:'Mars'},
        //    {valeur:4,name:'Avril'},
        //    {valeur:5,name:'Mai'},
        //    {valeur:6,name:'Juin'},
        //    {valeur:7,name:'Juillet'},
        //    {valeur:8,name:'Août'},
        //    {valeur:9,name:'Septembre'},
        //    {valeur:10,name:'Octobre'},
        //    {valeur:11,name:'Novembre'},
        //    {valeur:12,name:'Décembre'}
        //    ];
        //$scope.jours=[];
        ////for(var i=new Date().getFullYear();i>new Date().getFullYear()-80;i--){
        //    $scope.annees.push(i);
        //}
        //
        //for(i=1;i<32;i++){
        //    $scope.jours.push(i);
        //}

        $scope.click_im=function(){
            $("#im").trigger("click");
        };
        $scope.fileNameChanged=function(element){
            $scope.$apply(function() {
                $scope.compte.image = element.files[0];
                $("#image").fadeIn("fast").attr("src",URL.createObjectURL(element.files[0]));
                $scope.no_image=false;
            });
            console.log($scope.compte);
        };

        $scope.modifierEmail = function (u, e) {
            //console.log(u,e);
            Restangular.one("user", u.user.id).get().then(function (user) {
                console.log(user);
                user.paypal_email = e.email;
                user.put();
                $scope.paypal = user.paypal_email;
            });
        };

        $scope.enregistrerCompte=function(c){
            console.log(c);
        };

        $scope.choix = $state.current.name;

        $scope.enregistrerSociaux = function (s) {
            console.log(s);
        };
        $scope.modifierMotDePasse = function (m) {
            console.log(m);
        };

    }])

    .controller('FacturesCtrl',['$scope',function($scope){
        $scope.events=[];
    }])

    .controller('OMCtrl',['$scope',"$filter",function($scope,$filter){
        $scope.om=[
            {numero:696969696,titulaire:"Titulaire",id:1},
            {numero:699999999,titulaire:"slim",id:2}
        ];
        $scope.titre="Nouveau compte orange money";

        $scope.supprimer=function(o){
          $scope.om=supprimerTout(o,$scope.om);
        };

        $scope.supprimer=function(o){
            var target=$filter('filter')($scope.om,{id:o.id},true)[0];
            $scope.om.splice($scope.om.indexOf(target),1);
        };

        $scope.clearOM=function(){
            $scope.no={};
        };

        $scope.enregistrerOM=function(o){
            var id= o.id;
            if(o.id=!undefined){
                $scope.supprimer(o);
            }
            o.id=id;
            $scope.om.push(o);
            $("#close").trigger("click");
        };

        $scope.choixOM=function(o){
            $scope.titre="Modifier compte orange money";
            $scope.no=o;
        }
    }])

    .controller('TestCtrl',['$scope',function($scope){
        $scope.click_im=function(){
            $("#im").trigger("click");
        }
       $scope.fileNameChanged=function(element){
           $scope.$apply(function() {
               $scope.theFile = element.files[0];
               //console.log(theFile);
           });
           console.log($scope.theFile);
           $("#image").fadeIn("fast").attr("src",URL.createObjectURL($scope.theFile));
       }
    }])

    .controller('GestionCtrl', ['$scope', '$state', '$filter', 'Restangular', function ($scope, $state, $filter, Restangular) {
        var id = $state.params.id;

        var events = Restangular.one("event").get({id: id});
        var participants = Restangular.all("participant").getList();
        events.then(function (e) {
            $scope.event = e[0];
            $scope.quantite = 0;
            $scope.vendu = 0;
            participants.then(function (p) {
                $scope.participants = p;
                //console.log($scope.event,$scope.participants);
                angular.forEach($scope.event.tickets, function (v, k) {
                    $scope.quantite += v.quantity;
                    var x = _.filter($scope.participants, function (p) {
                        if (v.id == p.ticket_id) {
                            $scope.vendu += p.number;
                            return p;
                        }
                    });
                    v.participant = x;
                });
                console.log($scope.event);
            });
        });


        $scope.choix = $state.current.name;

        $scope.modifierUrlEvent=function(e){
            console.log(e);
        };
    }])

    .controller('ProductCtrl',['$scope','$stateParams',function($scope,$stateParams){
        $scope.category=$stateParams.category;
        $scope.choice=$stateParams.choice;
        $scope.product=$stateParams.product;
    }])

    .controller('ContactCtrl', ['$scope', '$filter', 'Restangular', '$cookies', function ($scope, $filter, Restangular, $cookies) {
        $scope.user = $cookies.getObject("user");
        $scope.contact = {};
        $scope.contact.action = "nouveau";
        Restangular.all("contact?user_id=" + $scope.user.id).getList().then(function (c) {
            $scope.contacts = c;
        }, function (e) {
            console.log(e);
        });

        var allContact = Restangular.all("contact");

        $scope.enregistrerContact = function (contact) {
            var id;
            var c = contact.contact;
            if (contact.action == "editer") {
                Restangular.one("contact", contact.id).get().then(function (data) {
                    console.log(data);
                    data.email = contact.email;
                    data.last_name = contact.last_name;
                    data.first_name = contact.first_name;
                    console.log(data);
                    data.put();
                });
            }
            else {
                // ajout
                var x = c.split(';');// recupération des lignes
                console.log("qsd");
                for (var i = 0; i < x.length; i++) {
                    var xx = x[i].split(',');
                    allContact.post({last_name: xx[2], first_name: xx[1], email: xx[0], user_id: $scope.user.id});
                }
                Restangular.all("contact?user_id=" + $scope.user.id).getList().then(function (c) {
                    $scope.contacts = c;
                }, function (e) {
                    console.log(e);
                });
            }
            $("#close").trigger("click");
        };


        $scope.nouveau = function () {
            $scope.titre = "Nouveau contact";
            $scope.contact.action = "nouveau";
        }

        $scope.choixContact=function(c){
            $scope.contact = c;
            $scope.contact.action = "editer";
            $scope.titre="Modifier contact";
        };

        $scope.supprimer=function(c){
            var target=$filter('filter')($scope.contacts,{id:c.id},true)[0];
            $scope.contacts.splice($scope.contacts.indexOf(target),1);
            Restangular.one("contact", c.id).get().then(function (data) {
                data.remove();
            });
        };

    }])
;

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: -25.363882, lng: 131.044922 }
    });

    map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
    });
};

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
};

