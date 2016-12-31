/**
 * Created by Thedward on 10/08/2016.
 */


controller

//just pr les test paypal
    .controller('PaypalSuccesCtrl', ['$scope', 'Restangular', '$stateParams',
        function ($scope, Restangular, $stateParams) {
            // remarque je divisie par 3145 pour eviter k l utilisateur deduire des valeur d id
            // ceci parceque avant de retouner j avais multilplier l id par cela
            var id = parseInt($stateParams.id) / 3145;
            Restangular.one('participant', id).get().then(function (data) {
                $scope.participant = data;
            });

        }])
    .controller('PaypalCtrl', ['$scope', 'Restangular', '$sce', '$window','$stateParams',
        function ($scope, Restangular, $sce, $window) {

            $scope.test = function () {
                $scope.part = {
                    "ticket_id": 11,
                    "number": 3,
                    "user_id":19,
                    "type_payment": 2


                };
                Restangular.all('participant').post($scope.part).then(function (data) {

                    $window.location.href = data;


                }, function (error) {
                    console.log(error);
                });
            }
        }])
    .controller('AppCtrl', ['$scope', 'gettextCatalog', function ($scope, gettextCatalog) {

    }])

    .controller('AuthCtrl', ['$scope', '$auth', '$state', '$stateParams', '$cookies', 'Restangular', '$rootScope',
        function ($scope, $auth, $state, $stateParams, $cookies, Restangular, $rootScope) {
        $scope.message="";
        //$cookies.putObject("user",undefined);

        $scope.signup = function () {
            $auth.signup($scope.auth).then(function (response) {
                // tu stocke xa dans le rootScope au cas ou !!!
                $auth.setToken(response.data.token);
                //console.info('Signup  successfully.');
                Restangular.one('authenticated-user').get().then(function (data) {
                    data.user.hash=$scope.auth.password;
                    $cookies.putObject("user", data.user, {path: '/'});
                });
                $state.go('home');

            }, function (error) {
                //console.error(error);
            });
        };

        $scope.login = function () {
            $auth.login($scope.auth).then(function (response) {
                // tu stocke xa dans le rootScope au cas ou !!!
                var t = response.data.token;
                $auth.setToken(t);
                //console.info('Logged in successfully.');
                Restangular.one('authenticated-user').get().then(function (data) {
                    data.user.hash=$scope.auth.password;
                    $cookies.putObject("user", data.user, {path: '/'});
                });
                if ($rootScope.next != undefined) {
                    $state.go($rootScope.next.name, $rootScope.next.params);
                    //window.location.reload();
                } else {
                    $state.go('home');
                }
            }, function (error) {
                //console.error(error);
                $scope.message = "Paramètres de connexion invalides";
            });
        }

    }])

    .controller('CreateCtrl', ['$scope', '$filter', 'Restangular', '$cookies', '$state', '$auth', function ($scope, $filter, Restangular, $cookies, $state, $auth) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            var tickets=Restangular.all("ticket");
            var payment=Restangular.all("ticket_type_payment");


            $scope.user = $cookies.getObject("user");
            $scope.message = "";
            $scope.option = "modifier";
            if ($state.params.target != undefined && $state.params.target != "") {
                $scope.option = $state.params.target;
            }
            $scope.if_id = false;
            if ($state.params.id != "" && $state.params.id != undefined) {
                $scope.if_id = true;
                $scope.id = $state.params.id;

                // recuperation de l"évenement
                Restangular.one("event",$scope.id).get().then(function(e){
                    $scope.e=e;
                });
            }
            $scope.e = {};
            $scope.e.confidentialite = "Public";
            $scope.e.organisateur = {};
            $scope.e.billets = [];
            $scope.inclure = false;

            $scope.organisateurs = organisateurs;

            Restangular.all('town').getList().then(function (data) {
                $scope.villes = data;
            });
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
            Restangular.all('type_payment').getList().then(function(p){
                $scope.payment=p;
            });
            Restangular.all('adress').getList().then(function(a){
                $scope.adress=a;
            });

            $scope.choixAdress=function(a){
                console.log($scope.e.adress,a);
                $scope.e.adress=a;
            };

            $scope.reset_adress = function () {
                $scope.e.adress = {};
            };

            $scope.uploadFiles = function (file) {
                //console.log(file);
                $scope.fileData = file;
                var fd = new FormData();
                fd.append('file', file);
                Restangular.one('event').withHttpConfig({transformRequest: angular.identity})
                    .customPOST(fd, '', undefined, {'Content-Type': undefined})
            };

            $scope.ajouter = function (type) {
                $scope.type = type;
                $scope.e.billets.push({type: type, id: $scope.e.billets.length + 1});
            };

            $scope.supprimer = function (billet) {
                $scope.billets.splice($scope.billets.indexOf(billet), 1);
            };

            $scope.choixBillet = function (b) {
                $scope.billet_detail = b;
                //console.log(b);
            };

            $scope.annuler = function (b) {
                //console.log(b);
                var id = b.id;
                var nom = b.nom;
                var type = b.type;
                var quantite = b.quantite;
                var prix = b.prix;
                $scope.billets.splice($scope.billets.indexOf(b), 1);
                $scope.billets.push({id: id, type: type, nom: nom, quantite: quantite, prix: prix});
            };

            $scope.enregistrerEvenement = function () {
                if($scope.e.id!=undefined && $scope.e.id!=""){
                    // edition
                    $scope.e.put();
                }
                else{
                    // ajout
                    var statut={};
                    // verification si les champs requis sont présent
                    console.log($scope.e);
                    statut=validate($scope.e);

                    if(!statut.statut){
                        alert("Creation de l'événement impossible, Champs : "+statut.message+" à renseiger");
                    }
                    else {
                        var fd = new FormData();
                        fd.append('recurring', 'unique');
                        _.each($scope.e, function (val, key) {

                            if (key == 'start_date') {
                                fd.append(key, val.split('/').join('-') + " " + $scope.e['start_hour'] + ":00");
                            } else if (key == 'end_date') {
                                fd.append(key, val.split('/').join('-') + " " + $scope.e['end_hour'] + ":00");
                                //}
                                //else if(key=="organizer"){
                                //    _.each(val,function(v,k){
                                //        if(k=="web_site" || k=="facebook" || k=="twitter" || k=="google" || k=="instagram" || k=="linkedin"){
                                //            v="http://www."+v;
                                //        }
                                //    });
                            } else {
                                fd.append(key, val);
                            }
                        });
                        if (fd.get('organizer_id') == null){
                            fd.append("organizer_id",$scope.e.organizer.id);
                        }
                        fd.append('user_id', $scope.user.id);
                        // Evaris

                        var adresse = Restangular.all("adress");
                        var a=$scope.e.adress;
                        var createdad=$scope.e.adress;
                        // creation de l'adresse

                        if($scope.e.adress.id!="" && $scope.e.adress.id!=undefined && $scope.e.adress.id>0 ){
                            fd.append('adress_id', a.id);
                            createdad=a;
                            console.log("a");
                            var pro_event = Restangular.one('event')
                                .withHttpConfig({transformRequest: angular.identity})
                                .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function (data, status) {
                                    // creation des tickets
                                    var ev = data;
                                    console.log("d");

                                    // tu dois mettre l'id de l'event qui a été crée comme ça n'a pas marché chz je ne connais pas le contenu de data
                                    if (data.id != undefined) {
                                        _.each($scope.e.billets, function (b, k) {
                                            if ($scope.e.confidentialite != "Public") {
                                                b.listing = $scope.e.liste_participant;
                                            }
                                            else {
                                                b.listing = 'public';
                                            }

                                            var tick_obj = {
                                                event_id: ev.id,
                                                name: b.nom,
                                                description: b.nom + " ticket for " + ev.name + " event",
                                                amount: b.prix,
                                                max_command: b.max_command,
                                                start_date: ev.start_date,
                                                end_date: ev.end_date,
                                                quantity: b.quantite,
                                                listing_privity: b.listing
                                            };
                                            tickets.post(tick_obj).then(function (billet) {
                                                //console.log(billet);
                                                if (b.type == "Payant") {
                                                    // creation du lien ticket mode de paiement
                                                    // faut t'assurer que ce code marche
                                                    Restangular.all('distribution_point').post({
                                                        name: createdad.name,
                                                        date: ev.start_date,
                                                        ticket_id: billet.id,
                                                        adress_id: createdad.id
                                                    }).then(function (da) {
                                                    });
                                                    _.each($scope.payment, function (val, key) {
                                                        var ttp = {
                                                            ticket_id: billet.id,
                                                            type_payment_id: val.id
                                                        };
                                                        payment.post(ttp).then(function (data) {
                                                            //console.log(data);
                                                        });
                                                    });

                                                }
                                            });

                                        });
                                    }
                                    $state.go('events', {id: ev.id});

                                }, function (err) {
                                    console.log(err.data);
                                });
                        }
                        else{
                            var pro_adresse = adresse.post(a);
                            pro_adresse.then(function (data) {
                                createdad = data;
                                fd.append('adress_id', data.id);
                                console.log("b",data.id);
                                var pro_event = Restangular.one('event')
                                    .withHttpConfig({transformRequest: angular.identity})
                                    .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function (data, status) {
                                        // creation des tickets
                                        var ev = data;
                                        console.log("d");

                                        // tu dois mettre l'id de l'event qui a été crée comme ça n'a pas marché chz je ne connais pas le contenu de data
                                        if (data.id != undefined) {
                                            _.each($scope.e.billets, function (b, k) {
                                                if ($scope.e.confidentialite != "Public") {
                                                    b.listing = $scope.e.liste_participant;
                                                }
                                                else {
                                                    b.listing = 'public';
                                                }

                                                var tick_obj = {
                                                    event_id: ev.id,
                                                    name: b.nom,
                                                    description: b.nom + " ticket for " + ev.name + " event",
                                                    amount: b.prix,
                                                    max_command: b.max_command,
                                                    start_date: ev.start_date,
                                                    end_date: ev.end_date,
                                                    quantity: b.quantite,
                                                    listing_privity: b.listing
                                                };
                                                tickets.post(tick_obj).then(function (billet) {
                                                    //console.log(billet);
                                                    if (b.type == "Payant") {
                                                        // creation du lien ticket mode de paiement
                                                        // faut t'assurer que ce code marche
                                                        Restangular.all('distribution_point').post({
                                                            name: createdad.name,
                                                            date: ev.start_date,
                                                            ticket_id: billet.id,
                                                            adress_id: createdad.id
                                                        }).then(function (da) {
                                                        });
                                                        _.each($scope.payment, function (val, key) {
                                                            var ttp = {
                                                                ticket_id: billet.id,
                                                                type_payment_id: val.id
                                                            };
                                                            payment.post(ttp).then(function (data) {
                                                                //console.log(data);
                                                            });
                                                        });

                                                    }
                                                });

                                            });
                                        }
                                        $state.go('events', {id: ev.id});

                                    }, function (err) {
                                        console.log(err.data);
                                    });
                            });
                        }
                        console.log("c");



                        pro_event.then(function (data) {
                            //creation des eventlink;
                        });

                    }
                }


            };

            $scope.save_event = function () {
                $scope.e.status = 'save';
                $scope.enregistrerEvenement();

            };
            $scope.publish_event = function () {
                $scope.e.status = 'active';
                $scope.enregistrerEvenement();

            };

            $scope.$watch('e.organisateur.nom', function () {
                if ($scope.e.organisateur.nom != undefined)
                    $scope.e.organisateur.description = $filter("filter")($scope.organisateurs, {id: $scope.e.organisateur.nom}, true)[0].description;
            });

            $scope.edit_event=function(){
                //console.log();
                alert("En maintenance");
            };

            // pour l'image
            $scope.upload = function (files) {
                if (files) {
                    $scope.e.images = files;
                }
            };
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });
            $("#image_boutique").click(function () {
                $("#id_icone_boutique").click();
            });
            $("#id_icone_boutique").change(function (event) {
                var tmppath = URL.createObjectURL(event.target.files[0]);
                $scope.upload(event.target.files[0]);
                $("#image").fadeIn("fast").attr("src", tmppath);
            });
            // fin image
        }
    }])

    .controller('HeaderCtrl', ['$scope', '$auth', '$state', '$rootScope', '$cookies', 'Restangular', function ($scope, $auth, $state, $rootScope, $cookies, Restangular) {
        $scope.loguer = false;
        $scope.lieu = false;
        $scope.user = $cookies.getObject("user");

        if ($state.current.name != 'home' && $state.current.name != "events" && $state.current.name != "login" && $state.current.name != "register") {
            $scope.lieu = true;
        }
        $scope.logout = function () {
            $auth.logout();
            $scope.loguer = false;
            $state.go('home');
        };

        $scope.create_event = function () {
            $rootScope.next = {name: "create"};
            $state.go('login');
        };

        $scope.searchEvent=function(key){
            //console.log(key);
            $rootScope.searchKey = key;
            $state.go("events");
            // à faire
        };

        if ($auth.isAuthenticated() && $auth.getToken() != null) {
            $scope.loguer = true;

            if ($cookies.getObject("user") != undefined) {
                Restangular.all("intrested_event").getList({user_id: $cookies.getObject("user").id}).then(function (event) {
                    $scope.save = 0;
                    angular.forEach(event, function (e, k) {
                        if (e.event.status == "active") {
                            $scope.save++;
                        }
                    });
                });
                Restangular.all("participant").getList({user_id: $cookies.getObject("user").id}).then(function (event) {
                    $scope.billet = 0;
                    angular.forEach(event, function (e, k) {
                        Restangular.one("event", e.ticket.event_id).get().then(function (data) {
                            if (data.status == "active") {
                                $scope.billet += e.number;
                            }
                        });
                    });
                });
            }
        } else {
            $scope.loguer = false;
            if ($state.current.name != "login" && $state.current.name != "register") {
                var next = {};
                next.name = $state.current.name;
                next.params = $state.params;
                $rootScope.next = next;
                //console.log(next);
            }
            if ($state.current.loginRequired) {
                $state.go('login');
            }
        }
    }])

    .controller('FooterCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.currentDate=new Date();
        $scope.pays=pays;
        $scope.villes=villes;

        $scope.langue = [
            {name: "Français", value: "fr"},
            {name: "English", value: "en"}
        ];

    }])

    .controller('HomeCtrl', ['$scope', 'Restangular', '$rootScope', '$state', '$cookies', '$auth', function ($scope, Restangular, $rootScope, $state, $cookies, $auth) {
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
                v = formatEvent(v, Restangular, $scope, true);
                if (v.tickets.length > 0 && v.status == "active") {
                    tm.push(v);
                }
            });
            //console.log(tm);
            $scope.events = tm;
        }, function (err) {
            console.log(err);
        });
        $scope.host=location.host;
        // recuperation de la publicite
        Restangular.all("publicity").getList({status:"home"}).then(function(pub){
            $scope.pub=pub;
        });

        var rest_interest = Restangular.all("intrested_event");

        $scope.interest = function (e) {
            if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
                rest_interest.post({user_id: $cookies.getObject("user").id, event_id: e.old_id});
                alert("Evénement sauvegardé");
            }
            else {
                $rootScope.next = {name: $state.current.name, params: $state.params};
                $state.go("login");
            }

        };

        $scope.search = function (s) {
            //console.log(s);
            $rootScope.search = s;
            //if(s.titre!=""|| s.date!=null|| s.ville!="")
            $state.go("events");
        };

        $(function(){
            homeCarrousel();
            hoverPack();
        });
    }])

    .controller('EventCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'Restangular', '$filter', '$cookies', '$auth', function ($scope, $stateParams, $state, $rootScope, Restangular, $filter, $cookies, $auth) {
        var id = $stateParams.id;
        var target = $stateParams.target;
        var se = $rootScope.search;
        // //console.log(se);
        var searchKey = $rootScope.searchKey;
        var rest_interest = Restangular.all("intrested_event");
        $scope.interest = function (e) {
            if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
                rest_interest.post({user_id: $cookies.getObject("user").id, event_id: e.old_id});
                alert("Evénement sauvegardé");
            }
            else {
                $rootScope.next = {name: $state.current.name, params: $state.params};
                $state.go("login");
            }

        };

        // recuperation de la publicite
        Restangular.all("publicity").getList({status:"listing"}).then(function(pub){
            //console.log(pub);
            $scope.pub=pub;
        });

        $scope.categories = [];
        $scope.types = [];
        $scope.par_page = 12;
        // filtre avc undescore pour chercher suivant la categorie et le titre
        // example d utilisation de restangular c valable pour le post put delete regarde juste la doc
        //tu pouvais aussi utilise la factorie customize Event k j ai cree
        $scope.date_deb = [];
        Restangular.all("town").getList().then(function(v){
            $scope.villes=v;
            if(id=="ville"){
                $scope.ville=$filter("filter")(v,{name:target},true)[0];
            }
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
                        else if(id=="ville"){
                            $scope.titre = "Recherche des événements dans <span class='blue text-capitalize'>'" + target + "'</span>";
                            if (e.adress.town_id == $scope.ville.id) {
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
                    v = formatEvent(v, Restangular, $scope, true);
                    if (v.tickets.length > 0 && v.status == "active") {
                        tm.push(v);
                    }
                });
                $scope.searchKey = searchKey;
                $scope.events = tm;
            }, function (err) {
                console.log(err);
            });
        });

        Restangular.all('event_topic').getList().then(function (data) {
            $scope.categories = data;
        });
        Restangular.all('event_type').getList().then(function (data) {
            $scope.types = data;
        });



        // $scope.events=events;
    }])

    .controller('DetailEventCtrl', ['$scope', '$stateParams', '$state', '$rootScope', 'Restangular', '$cookies', '$auth', function ($scope, $stateParams, $state, $rootScope, Restangular, $cookies, $auth) {
        var nom = $stateParams.nom.split("/")[1];
        var id = parseInt(nom.substring(4, nom.length));
        $scope.mode=[];
        //console.log(id);
        Restangular.one('event', id).get().then(function (data) {
            //console.log(data);
            var t   = data.banner_picture.substring(0, 10);
            t += "/" + data.banner_picture.substring(11, data.banner_picture.length);
            data.banner_picture = t;
            var d = new Date(data.start_date);
            data.date_debut = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
            d = new Date(data.end_date);
            data.date_fin = jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
            Restangular.one('town', data.adress.town_id).get().then(function (t) {
                data.town = t;
            });
            // recuperation du mode de paiement
            angular.forEach(data.tickets,function(t,v){
                Restangular.all("ticket_type_payment").getList({ticket_id: t.id}).then(function(pay){
                    angular.forEach(pay,function(type,kk){
                        if(type.ticket_id== t.id){
                            $scope.tag=type.type_payment.tag;
                            $scope.mode=type.type_payment.name;
                            t.type_payment=type.id
                        }
                    });
                });
            });
            data.banner_picture= data.banner_picture.replace("//","/");
            $scope.event = data;
            console.log(data);
        }, function (err) {
            console.log(err);
        });
        $scope.qte = 0;

        var rest_interest = Restangular.all("intrested_event");
        $scope.interest = function (e) {
            if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
                rest_interest.post({user_id: $cookies.getObject("user").id, event_id: e.old_id});
            }
            else {
                $rootScope.next = {name: $state.current.name, params: $state.params};
                $state.go("login");
            }

        };

        // recuperation des modes paiements


        var participants=Restangular.all("participant");
        $scope.acheterBillet=function(t){
            if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
                var u=$cookies.getObject("user");
                var ticket_id="";
                angular.forEach(t,function(b,k){
                    if(b.qte>0){
                        //console.log(b);
                        if(u.person==null){
                            alert("Impossible d'enregistrer votre demande : Manque d'informations sur l'utilisateur. Merci de renseigner vos informations personnelles");
                        }
                        else{
                            if($scope.tag=='pp'){

                            }
                            else{
                                //console.log({number: b.qte,user_id: u.id,ticket_id: b.id,type_payment: b.type_payment});
                                participants.post({
                                    number: b.qte,user_id: u.id,ticket_id: b.id,type_payment: b.type_payment
                                });
                                ticket_id+= b.id+"+";
                            }
                        }
                    }
                });
                if($scope.tag=='pp'){
                    // redirection vers paypal
                }
                else{
                    $state.go("paiement",{user_id: u.id,ticket_id:ticket_id,event_id:id});
                }
            }
            else {
                $rootScope.next = {name: $state.current.name, params: $state.params};
                $state.go("login");
            }
        };

    }])

    .controller('PaiementCtrl', ['$scope', '$stateParams', '$filter', 'Restangular', '$cookies', '$auth','$rootScope','$state','$timeout', function ($scope, $stateParams, $filter, Restangular, $cookies, $auth,$rootScope,$state,$timeout) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {

            $scope.user = $cookies.getObject("user");
            var u = $cookies.getObject("user");
            var tickets_id=$stateParams.ticket_id.split("+");
            var user_id=$stateParams.user_id;
            var event_id=$stateParams.event_id;

            $(".modal-backdrop").hide();

            $timeout(function(){
                Restangular.one("ticket",tickets_id[0]).get().then(function(ticket){
                    var id_mr=ticket.type_payments[0].id;
                    Restangular.one("mobile_receiver",id_mr).get().then(function(mo){
                        $scope.phone=mo.phone;
                    });
                });

                Restangular.one("event",event_id).get().then(function(data){
                    $scope.event=data;
                });

                if(u.id==user_id){
                    var participants=Restangular.all("participant");
                    $scope.billets=[];
                    $scope.montant=0;
                    participants.getList({user_id: u.id}).then(function(data){
                        angular.forEach(tickets_id,function(id,k){
                            if(id!=""&&id!=undefined){
                                var b=$filter('filter')(data,{ticket_id:id})[0];
                                if(b!=undefined){
                                    $scope.billets.push({id: b.id,quantite:b.number,ticket: b.ticket});
                                    $scope.montant+= b.number* b.ticket.amount;
                                }
                            }
                        });
                    });

                }

            },2000);
            // chargement du mobile receiver

            $scope.validerPaiement=function(mode,numero){
                alert("En cours de réalisation");
            };

            $scope.annulerCommande=function(b){
                Restangular.all("participant").getList({ticket_id: b.ticket.id}).then(function(data){
                    angular.forEach(data,function(partici,kk){
                        if(partici.user_id==$scope.user.id){
                            $scope.montant-=partici.ticket.amount;
                            //partici.remove();
                        }
                    });
                });
                $state.go("details",{nom:$scope.event.name+"/0000"+$scope.event.id});
            };

        }
        else{
            $rootScope.next = {name: $state.current.name, params: $state.params};
            $state.go("login");
        }

    }])

    .controller('MyEventCtrl', ['$scope', '$stateParams', '$filter', 'Restangular', '$cookies', '$auth', function ($scope, $stateParams, $filter, Restangular, $cookies, $auth) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            $scope.user = $cookies.getObject("user");

            var participants = Restangular.all("participant").getList();
            Restangular.all("event").getList({user_id: $scope.user.id}).then(function (data) {
                //console.log(data);
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
            $scope.events = $scope.eventOnline;

            $scope.choixEvent = function (choix) {
                //console.log(choix);
                if (choix == 0) {
                    $scope.events = $scope.eventOnline;
                } else if (choix == 1) {
                    $scope.events = $scope.eventSaved;
                } else if (choix == 2) {
                    $scope.events = $scope.eventPassed;
                }
            };
        }


    }])

    .controller('BilletCtrl', ['$scope', '$state', '$filter', 'Restangular', '$cookies', '$auth', function ($scope, $state, $filter, Restangular, $cookies, $auth) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            Restangular.all("intrested_event").getList({user_id: $cookies.getObject("user").id}).then(function (event) {
                $scope.save = 0;
                $scope.eventSave = [];
                angular.forEach(event, function (e, k) {
                    if (e.event.status == "active") {
                        $scope.save++;
                        $scope.eventSave.push(formatEvent(e.event, Restangular, $scope, false));
                    }
                });

                if ($state.current.name == "save") {
                    $scope.events = $scope.eventSave;
                    $scope.choix = "save";
                }
            });
            Restangular.all("participant").getList({user_id: $cookies.getObject("user").id}).then(function (event) {
                $scope.eventOnline = [];
                angular.forEach(event, function (e, k) {
                    Restangular.one("event", e.ticket.event_id).get().then(function (data) {
                        if (data.status == "active") {
                            data = formatEvent(data, Restangular, $scope, true);
                            data.billet = e.ticket.id;
                            data.quantite=e.number;
                            data.montant= e.ticket.amount;
                            $scope.eventOnline.push(data);
                        }
                    });
                });
                if ($state.current.name == 'billet') {
                    $scope.events = $scope.eventOnline;
                    $scope.choix = "online";
                }
            });

            $scope.choix = "";

            $scope.choixEvent = function (choix) {
                if (choix == 0) {
                    $scope.choix = "online";
                    $scope.events = $scope.eventOnline;
                }
                if (choix == 2) {
                    $scope.events = $scope.eventPassed;
                }
                if (choix == 1) {
                    $scope.choix = "save";
                    $scope.events = $scope.eventSave;
                }
            };

            $scope.choixBillet = function (b) {
                //console.log(b);
                //console.log($scope.choix);
                if ($scope.choix == 'online') {
                    window.location.href = "#/u/billet/detail/" + b.billet;
                }
                else if ($scope.choix == 'save') {
                    $state.go("details", {nom: b.name + "/" + b.id});
                }
            };
        }
    }])

    .controller('DetailBilletCtrl', ['$scope', '$state', '$filter', 'Restangular', '$cookies', '$auth', function ($scope, $state, $filter, Restangular, $cookies, $auth) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            $scope.user = $cookies.getObject("user");
            Restangular.one("ticket", $state.params.id).get().then(function (data) {
                // recuperation de l'organisateur
                Restangular.one("organizer",data.event.organizer_id).get().then(function(o){
                    $scope.organizer=o;
                });
                // recuperation des infos participant
                Restangular.all("participant").getList({user_id:$scope.user.id,ticket_id:data.id}).then(function(p){
                    data.quantite= p[0].number;
                });
                Restangular.one("adress", data.event.adress_id).get().then(function (adr) {
                    data.event.adress = adr;
                    data.event = formatEvent(data.event, Restangular, $scope, false);
                    data.created_at = formatDate(data.created_at);
                    //console.log(data);
                    $scope.billet = data;
                });

            });

            $scope.annulerCommande=function(){
                Restangular.all("participant").getList({ticket_id:$state.params.id}).then(function(d){
                    angular.forEach(d,function(p,k){
                        if(p.user_id==$scope.user.id){
                            Restangular.one("participant", d[0].id).remove();
                            $state.go("billet");
                        }
                    });
                })
            };
        }

    }])

    .controller('ProfilCtrl', ['$scope', '$filter', 'Restangular', '$cookies', '$auth', function ($scope, $filter, Restangular, $cookies, $auth) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            $scope.user = $cookies.getObject("user");
            var organisateurs = Restangular.all("organizer");
            organisateurs.getList({user_id: $scope.user.id}).then(function (o) {
                $scope.organisateurs = o;
                //console.log(o);
            });
            $scope.par_page = 5;
            $scope.organisateur = {};
            $scope.user_event = undefined;
            $scope.no_image = true;

            $scope.click_im = function () {
                $("#im").trigger("click");
            };
            $scope.fileNameChanged = function (element) {
                $scope.$apply(function () {
                    $scope.organisateur.image = element.files[0];
                });
                $("#image").fadeIn("fast").attr("src", URL.createObjectURL($scope.organisateur.image));
                $scope.no_image = false;
            };

            $scope.enregistrerOrgansiateur = function () {
                var fd = new FormData();
                if($scope.organisateur.id!=undefined && $scope.organisateur.id!=""){
                    //Edition
                    if(typeof $scope.organisateur.image =="string"){
                        $scope.organisateur= _.omit($scope.organisateur,"image");
                    }
                    fd = new FormData();
                    _.each($scope.organisateur, function (val, key) {
                        fd.append(key, val);
                    });
                    fd.append("_method","PUT");

                    Restangular.one('organizer',$scope.organisateur.id)
                        .withHttpConfig({transformRequest: angular.identity})
                        .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function (data) {
                            alert("Profil Mod");
                            console.log(data);
                        }, function (err) {
                            console.log(err.data);
                        });
                }
                else{
                     fd = new FormData();
                    _.each($scope.organisateur, function (val, key) {
                        //console.log(val,key);
                        if(key=="web_site"||key=="facebook"||key=="twitter"||key=="google"||key=="instagram"||key=="linkedin"){
                            val="http://www."+val;
                        }
                        fd.append(key, val);

                    });
                    fd.append("user_id",$scope.user.id);
                    console.log(fd,$scope.organisateur);

                    Restangular.one('organizer')
                        .withHttpConfig({transformRequest: angular.identity})
                        .customPOST(fd, '', undefined, {'Content-Type': undefined}).then(function (data) {
                            alert("Profil créé");
                            console.log(data);
                        }, function (err) {
                            console.log(err.data);
                        });
                }

            };



            $scope.nouveauOrganisateur = function () {
                $scope.organisateur = {};
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
        }
    }])

    .controller('CompteCtrl', ['$scope', '$filter', 'Restangular', '$state', '$cookies', '$auth','$timeout', function ($scope, $filter, Restangular, $state, $cookies, $auth,$timeout) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            $scope.compte = $cookies.getObject("user");
            Restangular.one("user",$scope.compte.id).get().then(function(da){
                $scope.compte=da;
                if($scope.compte.person!=undefined && $scope.compte.person!="" ){
                    Restangular.one("adress", $scope.compte.person.adress_id).get().then(function (a) {
                        $scope.compte.person.adress = a;
                    });

                    var d = new Date($scope.compte.person.birthdate);
                    $scope.compte.jour = d.getDate();
                    $scope.compte.mois = d.getMonth() + 1;
                    $scope.compte.annee = d.getYear() + 1900;
                }
                $scope.email = $scope.compte.email;
            });

            $scope.user_auth=$cookies.getObject("user");
            var allPerson=Restangular.all('person');
            var allAdress=Restangular.all('adress');
            Restangular.all("country").getList().then(function (c) {
                $scope.pays = c;
            });
            Restangular.all("town").getList().then(function (t) {
                $scope.ville = t;
            });


            $scope.user_event = undefined;
            $scope.no_image = true;
            $scope.modMail = false;

            //console.log($scope.compte);


            $scope.modifierEmail = function (u, e) {
                if(e.password == u.hash){
                    Restangular.one("user", u.id).get().then(function (user) {
                        user.email= e.email;
                        user.put();
                        $scope.message="Email mis à jour";

                    },function(b){
                        $scope.message="Echec de la mise à jour";
                        //console.log(b);
                    });
                }
                else{
                    $scope.message="Mot de passe incorrect";
                }
                $timeout(function(){
                    $scope.message="";
                    $scope.modMail = false;
                },5000);
            };

            allAdress.getList().then(function(d){$scope.adress=d;});
            Restangular.all("town").getList().then(function(data){$scope.villes=data;});
            $scope.reset_adress = function () {
                $scope.compte.person.adress = {};
            };



            $scope.choixAdress=function(a){
                if($scope.compte==null){
                    $scope.compte={person:{adress:a}};
                }
                else if($scope.compte.person==null){
                    $scope.compte.person={adress:a};
                }
                else{
                    $scope.compte.person.adress=a;
                }
            };

            $scope.enregistrerCompte = function (c) {
                console.log(c);
                if(c.person.id!=undefined && c.person.id!=""){
                    // edition
                    Restangular.one("person", c.person.id).get().then(function(d){
                        d= _.omit(d,'image');
                        d= _.omit(d,'birthdate');
                        if(c.mois<10){
                            c.person.birthdate= c.annee+"-0"+ c.mois+"-"+ c.jour;
                        }
                        else{
                            c.person.birthdate= c.annee+"-"+ c.mois+"-"+ c.jour;
                        }
                        console.log(c.person.birthdate);
                        d.sex= c.person.sex;
                        d.adress_id= c.person.adress_id;
                        //d.birthdate= c.person.birthdate;
                        d.cell_phone= c.person.cell_phone;
                        d.home_phone= c.person.home_phone;
                        d.first_name= c.person.first_name;
                        d.last_name= c.person.last_name;
                        d.web_site= c.person.web_site;

                        console.log(d);
                        d.put().then(function(d){alert("Compte Modifié")},function(d){console.log(d)});
                    });
                }
                else{
                    c.person.birthdate= c.annee+"-"+ c.mois+"-"+ c.jour;
                    //http://www.www.ww +(222)414141414
                    c.person.user_id=$scope.compte.id;
                    // ajout de l'adresse
                    if(c.person.adress.id!="" && c.person.adress.id!=undefined && c.person.adress.id>0 ){
                        c.person.adress_id= c.person.adress.id;
                    }
                    else{
                        var pro_adresse = allAdress.post(a);
                        pro_adresse.then(function (data) {
                            c.person.adress_id=data.id;
                        });
                    }
                    allPerson.post(c.person).then(function(d){console.log(d)},function(a){console.log(a)});
                }

                $scope.compte.person= c.person;
                $cookies.putObject("user",$scope.compte);
                //allAdress.post(c.person.adress);
                //allAdress.getList().then(function(data){
                //
                //    var a=_.filter(data,function(e){
                //       if(e.name== c.person.adress.name && e.street== c.person.adress.street && e.post_box== c.person.adress.post_box ){
                //           return e;
                //       }
                //    });
                //    //console.log(a);
                //    c.person.adress_id= a[0].id;
                //    allPerson.post(c.person);
                //    $scope.compte.person= c.person;
                //    $cookies.putObject("user",$scope.compte);
                //});

            };

            $scope.choix = $state.current.name;

            $scope.enregistrerSociaux = function (s) {
                var u=$scope.compte;
                Restangular.one("person", u.person.id).get().then(function (person) {
                    person.birthdate=person.birthdate.split(" ")[0];
                    if(u.person.facebook!="" && u.person.facebook!=person.facebook){
                        person.facebook= u.person.facebook;
                    }
                    if(u.person.google!="" && u.person.google!=person.google){
                        person.google= u.person.google;
                    }
                    if(u.person.instagram!="" && u.person.instagram!=person.instagram){
                        person.instagram= u.person.instagram;
                    }
                    if(u.person.twitter!="" && u.person.twitter!=person.twitter){
                        person.twitter= u.person.twitter;
                    }
                    if(u.person.linkedin!="" && u.person.linkedin!=person.linkedin){
                        person.linkedin= u.person.linkedin;
                    }
                    person.put();
                    $scope.message="Paramètres sociaux mis à jour";
                    $cookies.putObject("user",u);

                },function(b){
                    $scope.message="Echec de la mise à jour";
                    //console.log(b);
                });
            };
            $scope.modifierMotDePasse = function (m) {
                var u=$scope.compte;
                if(m.old == u.hash){
                    if(m.new == m.reNew){
                        Restangular.one("user", u.id).get().then(function (user) {
                            user.password= m.reNew;
                            user.put();
                            $scope.message="Mot de passe mis à jour";
                            u.hash= m.reNew;
                            $cookies.putObject("user",u);

                        },function(b){
                            $scope.message="Echec de la mise à jour";
                            //console.log(b);
                        });
                    }
                    else{
                        $scope.message="Les mots de passe ne correspondent pas";
                    }
                }
                else{
                    $scope.message="Mot de passe incorrect";
                }
                $timeout(function(){
                    $scope.message="";
                    $scope.modMail = false;
                },5000);
            };
        }
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
           //console.log($scope.theFile);
           $("#image").fadeIn("fast").attr("src",URL.createObjectURL($scope.theFile));
       }
    }])

    .controller('AideCtrl',['$scope','Restangular',function($scope,Restangular){
        $scope.par_page=7;
        Restangular.all("help").getList().then(function(aide){
            $scope.aide=aide;
        });
        // recuperation de la publicite
        Restangular.all("publicity").getList({status:"home"}).then(function(pub){
            $scope.pub=pub;
        });
    }])

    .controller('GestionCtrl', ['$scope', '$state', '$filter', 'Restangular', '$cookies', '$auth', function ($scope, $state, $filter, Restangular, $cookies, $auth) {
        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            var id = $state.params.id;

            $scope.par_page = 15;
            var events = Restangular.one("event").get({id: id});
            var participants = Restangular.all("participant").getList();
            events.then(function (e) {
                $scope.event = formatEvent(e[0], Restangular, $scope, false);
                $scope.quantite = 0;
                $scope.vendu = 0;
                participants.then(function (p) {
                    $scope.participants = p;
                    angular.forEach($scope.event.tickets, function (v, k) {
                        $scope.quantite += v.quantity;
                        v.number=0;
                        var x = _.filter($scope.participants, function (p) {
                            if (v.id == p.ticket_id) {
                                v.number+= p.number;
                                $scope.vendu += p.number;
                                return p;
                            }
                        });
                        v.participant = x;
                    });
                });
            });


            $scope.choix = $state.current.name;

            $scope.modifierUrlEvent = function (e) {
                //console.log(e);
            };
        }
    }])

    .controller('ContactCtrl', ['$scope', '$filter', 'Restangular', '$cookies', '$auth', function ($scope, $filter, Restangular, $cookies, $auth) {

        if ($auth.isAuthenticated() && $auth.getToken() != null && $cookies.getObject("user") != undefined && $cookies.getObject("user") != "") {
            $scope.user = $cookies.getObject("user");
            $scope.contact = {};
            $scope.contact.action = "nouveau";
            Restangular.all("contact?user_id=" + $scope.user.id).getList().then(function (c) {
                $scope.contacts = c;
            }, function (e) {
                //console.log(e);
            });

            var allContact = Restangular.all("contact");

            $scope.enregistrerContact = function (contact) {
                var id;
                var c = contact.contact;
                if (contact.action == "editer") {
                    Restangular.one("contact", contact.id).get().then(function (data) {
                        //console.log(data);
                        data.email = contact.email;
                        data.last_name = contact.last_name;
                        data.first_name = contact.first_name;
                        //console.log(data);
                        data.put();
                    });
                }
                else {
                    // ajout
                    var x = c.split(';');// recupération des lignes
                    //console.log("qsd");
                    for (var i = 0; i < x.length; i++) {
                        var xx = x[i].split(',');
                        allContact.post({last_name: xx[2], first_name: xx[1], email: xx[0], user_id: $scope.user.id});
                    }
                    Restangular.all("contact?user_id=" + $scope.user.id).getList().then(function (c) {
                        $scope.contacts = c;
                    }, function (e) {
                        //console.log(e);
                    });
                }
                $("#close").trigger("click");
            };


            $scope.nouveau = function () {
                $scope.titre = "Nouveau contact";
                $scope.contact.action = "nouveau";
            }

            $scope.choixContact = function (c) {
                $scope.contact = c;
                $scope.contact.action = "editer";
                $scope.titre = "Modifier contact";
            };

            $scope.supprimer = function (c) {
                var target = $filter('filter')($scope.contacts, {id: c.id}, true)[0];
                $scope.contacts.splice($scope.contacts.indexOf(target), 1);
                Restangular.one("contact", c.id).get().then(function (data) {
                    data.remove();
                });
            };
        }

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
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
}

function formatEvent(e, Restangular, scope, flag) {
    scope.date_deb = [];
    e.old_id = e.id;
    e.id = parseInt(Math.random(1, 5) * 10000) + "" + e.id;
    var d = new Date(e.start_date);
    scope.date_deb.push({
        name: jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900),
        value: e.start_date
    });

    e.date_debut = formatDate(e.start_date);
    e.heure_debut = d.getHours() + ":" + d.getMinutes();

    e.date_fin = formatDate(e.end_date);
    e.heure_fin = d.getHours() + ":" + d.getMinutes();

    if (flag) {
        if (e.adress != null)
        Restangular.one('town', e.adress.town_id).get().then(function (data) {
            e.town = data;
        });
    }

    return e;
}

function formatDate(date) {
    var d = new Date(date);
    return jour[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + (d.getYear() + 1900);
}

function validate(e){
    var statut=true;
    var message="";
    if((e.name=="" || e.name==undefined)){
        statut=false;
        message="Titre";
    }
    if((e.description=="" || e.description==undefined)){
        statut=false;
        message+="Description, ";
    }
    if((e.banner_picture=="" || e.banner_picture==undefined)){
        statut=false;
        message+="Image, ";
    }
    if((e.event_type_id=="" || e.event_type_id==undefined)){
        statut=false;
        message+="Type, ";
    }
    if((e.event_topic_id=="" || e.event_topic_id==undefined)){
        statut=false;
        message+="Catégorie, ";
    }
    if((e.start_date=="" || e.start_date==undefined)){
        statut=false;
        message+="Date de debut, ";
    }
    if((e.end_date=="" || e.end_date==undefined)){
        statut=false;
        message+="Date de fin, ";
    }
    if((e.confidentialite=="" || e.confidentialite==undefined)){
        statut=false;
        message+="Confidentialite, ";
    }
    if(e.billets.length<1){
        statut=false;
        message+="Billet ";
    }
    if(e.organizer=="" || e.organizer==undefined || e.organizer.id=="" || e.organizer.id==undefined){
        statut=false;
        message+="Organisateur ";
    }
    return {statut:statut,message:message};
}