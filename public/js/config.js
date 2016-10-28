/**
 * Created by Thedward on 10/08/2016.
 */

config

    .config(['$authProvider', function ($authProvider) {
        'ngInject';

        $authProvider.httpInterceptor = function () {
            return true;
        }

        $authProvider.loginUrl = '/api/signin';
        $authProvider.signupUrl = '/api/signup';
        $authProvider.tokenRoot = 'data';//compensates success response macro

    }])

    .config(['RestangularProvider', function (RestangularProvider) {
        //set the base url for api calls on our RESTful services
        var newBaseUrl = "/api";

        RestangularProvider.setBaseUrl(newBaseUrl);
    }])
    .config(['$stateProvider', '$urlRouterProvider',
    //'NgAdminConfigurationProvider',
    function($stateProvider,$urlRouterProvider
    ){
    $urlRouterProvider.otherwise( '/home');

    $stateProvider
        .state('home',{
            url:"/home",
            title: "Home",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url + 'index.html',
                    controller: "HeaderCtrl"
                },
                'header@home': {
                    templateUrl: template_url + 'static/header.html'
                },
                'body@home': {
                    templateUrl: template_url+'home/content.html',
                    controller:'HomeCtrl'
                },
                'footer@home': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('events',{
            url: "/evenements/:id/:target?",
            title: "Evénements",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'event/index.html',
                    controller:"EventCtrl"
                },
                'header@events': {
                    templateUrl: template_url + 'static/header.html',
                    controller:"HeaderCtrl"
                },
                'detail@events': {
                    templateUrl: template_url+'event/liste.html'
                },
                'footer@events': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('details',{
            url:"/details/:nom",
            title: "Détail",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller: "DetailEventCtrl"
                },
                'header@details': {
                    templateUrl: template_url + 'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@details': {
                    templateUrl: template_url+'event/detail-events.html'
                },
                'footer@details': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('myEvent',{
            url:"/u/events",
            title: "Gérer événements",
            loginRequired:true,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"MyEventCtrl"
                },
                'header@myEvent': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@myEvent': {
                    templateUrl: template_url+'user/gerer-event.html'
                },
                'footer@myEvent': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('gestion',{
            url:"/u/events",
            title: "Gestion",
            loginRequired:true,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"GestionCtrl"
                },
                'header@gestion': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@gestion': {
                    templateUrl: template_url+'user/gestion/index-gestion.html'
                },
                'footer@gestion': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('panneau',{
            url:"/panneau-gestion/:id",
            title: "Panneau de gestion",
            parent:'gestion',
            loginRequired:false,
            views:{
                'detail@gestion': {
                    templateUrl: template_url+'user/gestion/panneau.html'
                }
            }
        })
        .state('invitation',{
            url:"/invitation/:id",
            title: "Invitation par mail",
            parent:'gestion',
            loginRequired:false,
            views:{
                'detail@gestion': {
                    templateUrl: template_url+'user/gestion/invitation.html'
                }
            }
        })
        .state('email-participant',{
            url:"/email-participant/:id",
            title: "E-mail aux participants",
            parent:'gestion',
            loginRequired:false,
            views:{
                'detail@gestion': {
                    templateUrl: template_url+'user/gestion/email-participant.html'
                }
            }
        })
        .state('profil',{
            url:"/u/profil",
            title: "Profil",
            loginRequired:true,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"ProfilCtrl"
                },
                'header@profil': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@profil': {
                    templateUrl: template_url+'user/profil.html'
                },
                'footer@profil': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('myContact',{
            url:"/u/contact",
            title: "Mes contancts",
            loginRequired:true,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"ContactCtrl"
                },
                'header@myContact': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@myContact': {
                    templateUrl: template_url+'user/contact.html'
                },
                'footer@myContact': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('billet',{
            url:"/u/billet",
            title: "Billets",
            loginRequired:true,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"BilletCtrl"
                },
                'header@billet': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@billet': {
                    templateUrl: template_url+'user/billet.html'
                },
                'footer@billet': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('save',{
            url:"/u/save",
            title: "Sauvegardés",
            loginRequired:true,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"BilletCtrl"
                },
                'header@save': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@save': {
                    templateUrl: template_url+'user/billet.html'
                },
                'footer@save': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })

        .state('user',{
            url:"/u",
            title: "User",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'user/index.html',
                    controller:"CompteCtrl"
                },
                'header@user': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'footer@user': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('pass',{
            url:"/mot-de-passe",
            title: "Mot de passe",
            parent:'user',
            loginRequired:false,
            views:{
                'detail@user': {
                    templateUrl: template_url+'user/mot-de-passe.html'
                }
            }
        })
        .state('om',{
            url:"/om",
            title: "Orange money",
            parent:'user',
            loginRequired:false,
            views:{
                'detail@user': {
                    templateUrl: template_url+'user/om.html',
                    controller:"OMCtrl"
                }
            }
        })
        .state('carte',{
            url:"/carte-bancaire",
            title: "Cartes bancaires",
            parent:'user',
            loginRequired:false,
            views:{
                'detail@user': {
                    templateUrl: template_url+'user/carte.html',
                    controller:"CarteCtrl"
                }
            }
        })
        .state('sociaux',{
            url:"/sociaux",
            title: "Réseaux sociaux",
            parent:'user',
            loginRequired:false,
            views:{
                'detail@user': {
                    templateUrl: template_url+'user/sociaux.html'
                }
            }
        })
        .state('compte',{
            url:"/compte",
            title: "Compte",
            parent:'user',
            loginRequired:false,
            views:{
                'detail@user': {
                    templateUrl: template_url+'user/compte.html',
                    controller:"CompteCtrl"
                }
            }
        })
        .state('facture',{
            url:"/facture",
            title: "Factures",
            parent:'user',
            loginRequired:false,
            views:{
                'detail@user': {
                    templateUrl: template_url+'user/factures.html',
                    controller:"FacturesCtrl"
                }
            }
        })
        .state('test',{
            url:"/test",
            title: "Profil",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:"TestCtrl"
                },
                'body@test': {
                    templateUrl: template_url+'user/test.html'
                }
            }
        })
        .state('create',{
            url:"/create/:id/:target?",
            title: "Créer un événement",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@create': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@create': {
                    templateUrl: template_url+'event/form-events.html',
                    controller:"CreateCtrl"
                },
                'footer@create': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('register',{
            url:"/register",
            title: "S'enregistrer",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@register': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@register': {
                    templateUrl: template_url+'auth/register.html',
                    controller:"AuthCtrl"
                },
                'footer@register': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('login',{
            url:"/login",
            title: "S'identifier",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@login': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@login': {
                    templateUrl: template_url+'auth/login.html',
                    controller:"AuthCtrl"
                },
                'footer@login': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        })
        .state('reset',{
            url:"/reset",
            title: "S'identifier",
            loginRequired:false,
            views:{
                '':{
                    templateUrl: template_url+'index.html',
                    controller:'AppCtrl'
                },
                'header@reset': {
                    templateUrl: template_url+'static/header.html',
                    controller:"HeaderCtrl"
                },
                'body@reset': {
                    templateUrl: template_url+'auth/reset.html',
                    controller:"AuthCtrl"
                },
                'footer@reset': {
                    templateUrl: template_url+'static/footer.html',
                    controller:"FooterCtrl"
                }
            }
        });
    }])
;
