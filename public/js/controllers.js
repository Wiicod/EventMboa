/**
 * Created by Thedward on 10/08/2016.
 */
controller
    .controller('AppCtrl',['$scope',function($scope){

    }])

    .controller('AuthCtrl', ['$scope', '$auth', '$state', '$stateParams','$rootScope',
        function ($scope, $auth, $state, $stateParams,$rootScope) {
        $scope.message="";

        $scope.signup = function () {
            $auth.signup($scope.auth).then(function (response) {
                // tu stocke xa dans le rootScope au cas ou !!!
                console.log(response.data.user);
                $auth.setToken(response.data.token);
                console.info('Signup  successfully.');
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
                if ($rootScope.next!=undefined) {
                    $state.go($rootScope.next);
                } else {
                    $state.go('home');
                }
            }, function (error) {
                console.error(error);
                $scope.message="Paramètres de connexion invalides";
            });
        }

    }])

    .controller('CreateCtrl',['$scope','$filter',function($scope,$filter){
        $scope.message="";
        $scope.option="modifier";
        $scope.e={};
        $scope.e.confidentialite="Public";
        $scope.e.organisateur={};
        $scope.inclure=false;
        $scope.billets=[];
        $scope.organisateurs=organisateurs;

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

    .controller('HeaderCtrl', ['$scope', '$auth', '$state','$rootScope','Restangular', function ($scope, $auth, $state,$rootScope,Restangular) {
        $scope.loguer=false;
        $scope.lieu=false;

        if($state.current.name!='home' && $state.current.name!="events"){
            $scope.lieu=true;
        }
        $scope.logout = function () {
            $auth.logout();
            $scope.loguer=false;
            $state.go('home');
        };

        Restangular.one('authenticated-user').get().then(function(data){
            //console.log(data);
            $scope.user=data;
        });

        $scope.create_event=function(){
            $rootScope.next="create";
            $state.go('login');
        };

        $scope.searchEvent=function(key){
            console.log(key);
            $rootScope.searchKey=key;
            $state.go("events");
            // à faire
        };
        if($auth.getToken()!=null){
            $scope.loguer=true;
        }else{$scope.loguer=false;}
    }])

    .controller('FooterCtrl',['$scope',function($scope){
        $scope.currentDate=new Date();
        $scope.pays=pays;
        $scope.villes=villes;

    }])

    .controller('HomeCtrl',['$scope','Restangular','$rootScope','$state',function($scope,Restangular,$rootScope,$state) {
        Restangular.all('event_type').getList().then(function (data) {
            $scope.categories = data;
        }, function (err) {
            console.log(err);
        });
        $scope.date_deb=[];
        Restangular.all('event').getList().then(function (events) {
            console.log(events[0]);
            var tm=[];
            angular.forEach(events,function(v,k){
                v.id=parseInt(Math.random(1,5)*10000)+""+ v.id;
                var d=new Date(v.start_date);
                $scope.date_deb.push({name:jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900),value:v.start_date});
                v.date_debut=jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900);
                d=new Date(v.end_date);
                v.date_fin=jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900);
                Restangular.one('town', v.adress.town_id).get().then(function(data){
                    console.log(data);
                    v.town.country=data;
                });
                if(v.tickets.length>0 && v.status=="active"){
                    tm.push(v);
                }
            });
            $scope.events = tm;
        }, function (err) {
            console.log(err);
        });

        $scope.search=function(s){
            console.log(s);
            $rootScope.search=s;
            //if(s.titre!=""|| s.date!=null|| s.ville!="")
            $state.go("events");
        };

        $(function(){
            homeCarrousel();
            hoverPack();
        });
    }])

    .controller('EventCtrl', ['$scope', '$stateParams', '$rootScope', 'Restangular','$filter', function ($scope, $stateParams, $rootScope, Restangular,$filter) {
        var id=$stateParams.id;
        var target=$stateParams.target;
        var se=$rootScope.search;
        // console.log(se);
        var searchKey=$rootScope.searchKey;
        console.log("Event",searchKey);
        $scope.categories=[];
        $scope.types=[];
        $scope.par_page=12;
        // filtre avc undescore pour chercher suivant la categorie et le titre
        // example d utilisation de restangular c valable pour le post put delete regarde juste la doc
        //tu pouvais aussi utilise la factorie customize Event k j ai cree
        $scope.date_deb=[];

        Restangular.all('event_topic').getList().then(function (data) {$scope.categories=data;});
        Restangular.all('event_type').getList().then(function (data) {$scope.types=data;});
        Restangular.all('event').getList().then(function (events) {
            if(id!="" && target!=""){
                var out = _.filter(events, function (e) {
                    if(id=="topic"){
                        $scope.titre="Recherche des événements suivant la catégorie <span class='blue'>'"+target+"'</span>";
                        if(e.event_topic.name==target){
                            return e;
                        }
                    }
                    else if(id=='type'){
                        $scope.titre="Recherche des événements suivant le type <span class='blue'>'"+target+"'</span>";
                        if(e.event_type.name==target){
                            return e;
                        }
                    }
                });
                events=out;
            }
            else if(se!=undefined){
                // rechercher
                var out = _.filter(events, function (e) {
                    if(e.name==se.titre || e.start_date==se.date ||e.town.name==se.ville){
                        return e;
                    }
                    else{

                    }
                });
            }
            else if(searchKey!=undefined && searchKey!=""){
                $scope.titre="Recherche des événements suivant le mot <span class='blue'>'"+target+"'</span>";
            }
            else{
                $scope.titre="Evénements pour vous";
            }
            var tm=[];
            angular.forEach(events,function(v,k){
                v.id=parseInt(Math.random(1,5)*10000)+""+ v.id;
                var d=new Date(v.start_date);
                $scope.date_deb.push({name:jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900),value:v.start_date});
                v.date_debut=jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900);
                d=new Date(v.end_date);
                v.date_fin=jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900);
                Restangular.one('country', v.town.country_id).get().then(function(data){
                    v.town.country=data;
                });
                if(v.tickets.length>0 && v.status=="active"){
                    tm.push(v);
                }
            });
            $scope.searchKey=searchKey;
            $scope.events = tm;
        }, function (err) {
            console.log(err);
        });



       // $scope.events=events;
    }])

    .controller('DetailEventCtrl', ['$scope', '$stateParams', 'Restangular', function ($scope, $stateParams, Restangular) {
        var nom=$stateParams.nom;
        var id=parseInt(nom.substring(nom.length-1,nom.length));
        console.log(id);
        Restangular.one('event',id).get().then(function (data) {
            console.log(data);
            var t=data.banner_picture.substring(0,10);
            t+="/"+data.banner_picture.substring(11,data.banner_picture.length);
            data.banner_picture=t;
            var d=new Date(data.start_date);
            data.date_debut=jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900);
            d=new Date(data.end_date);
            data.date_fin=jour[d.getDay()]+" "+ d.getDate()+" "+ mois[d.getMonth()]+" "+(d.getYear()+1900);
            Restangular.one('country', data.town.country_id).get().then(function(c){
                data.town.country=c;
            });
            $scope.event = data;
        }, function (err) {
            console.log(err);
        });
        $scope.qte=0;


    }])

    .controller('MyEventCtrl',['$scope','$stateParams','$filter',function($scope,$stateParams,$filter){
        $scope.eventOnline=$filter('filter')(events,{statut:0});
        $scope.eventPassed=$filter('filter')(events,{statut:2});
        $scope.eventSave=$filter('filter')(events,{statut:1});

        $scope.events=$scope.eventOnline;
        $scope.choixEvent=function(choix){
            console.log(choix);
            $scope.events=$filter('filter')(events,{statut:choix});
        }

    }])

    .controller('BilletCtrl',['$scope','$state','$filter',function($scope,$state,$filter){
        $scope.eventOnline=$filter('filter')(events,{statut:0});
        $scope.eventPassed=$filter('filter')(events,{statut:2});
        $scope.eventSave=$filter('filter')(events,{statut:1});

        $scope.choix="";

        if($state.current.name=='billet'){
            $scope.events=$scope.eventOnline;
            $scope.choix="online";
        }
        else if($state.current.name=="save"){
            $scope.events=$scope.eventSave;
            $scope.choix="save";
        }
        else{
            $scope.events=$scope.eventPassed;
            $scope.choix="passed";
        }

        $scope.choixEvent=function(choix){
            $scope.events=$filter('filter')(events,{statut:choix});
        };

        $scope.choixBillet=function(b){
            $scope.billet=b;
            console.log(b);
        };

    }])

    .controller('ProfilCtrl',['$scope','$filter',function($scope,$filter){
        $scope.users=organisateurs;
        $scope.user=$scope.users[0];
        $scope.organisateur={};
        $scope.user_event=undefined;
        $scope.no_image=true;

        $scope.click_im=function(){
            $("#im").trigger("click");
        };
        $scope.fileNameChanged=function(element){
            $scope.$apply(function() {
                $scope.organisateur.image = element.files[0];
                $("#image").fadeIn("fast").attr("src",URL.createObjectURL($scope.organisateur.image));
                $scope.no_image=false;
            });
        };

        $scope.$watch('organisateur.who',function(){
            if($scope.organisateur.who!=undefined){
                $scope.organisateur=$filter('filter')($scope.users,{nom:$scope.organisateur.who},true)[0];
            }
        });

        $scope.enregistrerOrgansiateur=function(o){
            console.log(o);
        };

        $scope.nouveauOrganisateur=function(){
            $scope.organisateur={};
        }
    }])

    .controller('CompteCtrl',['$scope','$filter',function($scope,$filter){
        $scope.users=organisateurs;
        $scope.compte=$scope.users[0];
        $scope.user_event=undefined;
        $scope.no_image=true;
        $scope.modMail=false;
        $scope.email=$scope.compte.email;
        $scope.annees=[];
        $scope.mois=[
            {valeur:1,name:'Janvier'},
            {valeur:2,name:'Février'},
            {valeur:3,name:'Mars'},
            {valeur:4,name:'Avril'},
            {valeur:5,name:'Mai'},
            {valeur:6,name:'Juin'},
            {valeur:7,name:'Juillet'},
            {valeur:8,name:'Août'},
            {valeur:9,name:'Septembre'},
            {valeur:10,name:'Octobre'},
            {valeur:11,name:'Novembre'},
            {valeur:12,name:'Décembre'}
            ];
        $scope.jours=[];
        for(var i=new Date().getFullYear();i>new Date().getFullYear()-80;i--){
            $scope.annees.push(i);
        }

        for(i=1;i<32;i++){
            $scope.jours.push(i);
        }

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

        $scope.modifierEmail=function(e){
            console.log(e);
        }

        $scope.enregistrerCompte=function(c){
            console.log(c);
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

    .controller('UserCtrl',['$scope','$state',function($scope,$state){
        $scope.choix=$state.current.name;

        $scope.enregistrerSociaux=function(s){
            console.log(s);
        };
        $scope.modifierMotDePasse=function(m){
            console.log(m);
        };
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

    .controller('GestionCtrl',['$scope','$state','$filter',function($scope,$state,$filter){
        $scope.choix=$state.current.name;
        $scope.event=$filter('filter')(events,{id:$state.params.id})[0];


        $scope.modifierUrlEvent=function(e){
            console.log(e);
        };
    }])

    .controller('ProductCtrl',['$scope','$stateParams',function($scope,$stateParams){
        $scope.category=$stateParams.category;
        $scope.choice=$stateParams.choice;
        $scope.product=$stateParams.product;
    }])

    .controller('ContactCtrl',['$scope','$filter',function($scope,$filter){
        $scope.oldContact={};
        $scope.contacts=[{nom:"nom",prenom:"prenom",email:"qsd",id:4}];
        $scope.enregistrerContact=function(c){
            var id;
            if($scope.oldContact.id!=undefined){
                // edition
                var target=$filter('filter')($scope.contacts,{id:$scope.oldContact.id},true)[0];
                $scope.contacts.splice($scope.contacts.indexOf(target),1);
                id=$scope.oldContact.id;
            }
            var x= c.split(';');// recupération des lignes
            for(var i=0;i< x.length;i++){
                var xx=x[i].split(',');
                $scope.contacts.push({nom:xx[2],prenom:xx[1],email:xx[0],id:id});
            }
            $scope.contact="";
            $("#close").trigger("click");
        };
        $scope.titre="Nouveau contact";

        $scope.choixContact=function(c){
            $scope.oldContact=c;
            console.log(c);
            $scope.contact= c.email+","+ c.prenom+","+ c.nom;
            $scope.titre="Modifier contact";
        };

        $scope.supprimer=function(c){
            var target=$filter('filter')($scope.contacts,{id:c.id},true)[0];
            $scope.contacts.splice($scope.contacts.indexOf(target),1);
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

