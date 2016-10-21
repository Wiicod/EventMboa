/**
 * Created by Thedward on 02/09/2016.
 */
var pays= ["Cameroun","Senegal","Cote d'ivoire","Mali","Botsawana","Madagascar","Niger", "Maroc","Tunisie","Tchad","RDCongo","Guinnée Bissau","Guinnée","l'Ouganda","l'Egypt" ,"Nigeria","Ghana","Gabon","Kenya","Afrique du Sud","Algérie","Rwanda"];
var villes=["Douala","Yaoundé","Dakar","Abidjan","Abuja","Bamako","Antananarivo", "Accra","Bissau","Conakry","Le Caire","Libreville","Nairobi","Ndjamena","Niamey", "Pretoria","Rabat","Yamoussoukro","Alger","Kampala","Kigali","Kinshasa","Gaborone", "Tunis"]

var categories=[
    {
        id:1,
        nom:"Nom catégorie 1",
        description:"Description catégorie",
        image:"images/r.jpg"
    },
    {
        id:2,
        nom:"Nom catégorie 2",
        description:"Description catégorie",
        image:"images/r.jpg"
    },
    {
        id:3,
        nom:"Nom catégorie 3",
        description:"Description catégorie",
        image:"images/r.jpg"
    },
    {
        id:4,
        nom:"Nom catégorie 4",
        description:"Description catégorie",
        image:"images/r.jpg"
    }
];

var organisateurs=[
    {
        id:1,
        nom:"Slim ",
        description:"<h1>Titre</h1></br><p>Description 1</p>",
        image:"images/r.jpg",
        site:"http://lien-site-web.com",
        lien:"http://lien-profil.com",
        lien_facebook:"http://facebook.com/nom-facebook",
        lien_twitter:"http://twitter.com/nom-twitter"
    }
];

var events=[
    {
        id:1,
        titre:"Lancement de la campagne de dépistage du VIH SIDA",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias autem id incidunt natus perferendis quaerat quibusdam? Animi assumenda autem consequatur delectus dolore iste qui quo, quod repudiandae saepe. Esse.",
        billets:[
            {
                type:"gratuit",
                nom:"Nom du billet",
                quantite:50,
                description:"Description billet",
                lieu:"Lieu de vente",
                periode:"période de vente",
                commande:"10",
                montant:0
            }
        ],
        billet_vendu:2,
        statut:"0",
        adresse:{
            rue:"rue",
            adresse:"adresse",
            ville:"ville",
            region:"region",
            pays:"pays",
            boite_postale:"Boîte postale"
        },
        date_debut:"Date et heure début",
        date_fin:"Date et heure fin",
        image_baniere:"images/score-bg.jpg",
        organisateur:{
            nom:"Nom organisateur",
            description:"Description organisateur",
            lien:"create",
            email:"create"
        },
        billet_restant:48,
        confidentialite:{
            type:"Privé ou public",
            type_evenement:"Gala",
            theme:"Affaire",
            liste_participant:[
                {
                    nom:"Edward",
                    email:"enanda52@gmail.com"
                }
            ]
        }
    },
    {
        id:2,
        titre:"Titre",
        description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias autem id incidunt natus perferendis quaerat quibusdam? Animi assumenda autem consequatur delectus dolore iste qui quo, quod repudiandae saepe. Esse.",
        billets:[
            {
                type:"gratuit",
                nom:"Nom du billet",
                quantite:10,
                description:"Description billet",
                lieu:"Lieu de vente",
                periode:"période de vente",
                commande:"2",
                montant:0
            }
        ],
        billet_vendu:8,
        statut:"2",
        adresse:{
            rue:"rue",
            adresse:"adresse",
            ville:"ville",
            region:"region",
            pays:"pays",
            boite_postale:"Boîte postale"
        },
        date_debut:"Date et heure début",
        date_fin:"Date et heure fin",
        image_baniere:"images/score-bg.jpg",
        organisateur:{
            nom:"Nom organisateur",
            description:"Description organisateur",
            lien:"create",
            email:"create"
        },
        billet_restant:1,
        confidentialite:{
            type:"Privé ou public",
            type_evenement:"Gala",
            theme:"Affaire",
            liste_participant:[
                {
                    nom:"Edward",
                    email:"enanda52@gmail.com"
                }
            ]
        }
    }
];


var homeCarrousel=function(){
    $('.owl-carousel').owlCarousel({
        animateOut: 'fadeOut',
        items:1,
        loop:true,
        margin:0,
        autoplay:true,
        autoplayTimeout:7000,
        autoplayHoverPause:true,
        stagePadding:0,
        smartSpeed:450
    });
};

var windowScroll = function() {
    var lastScrollTop = 0;

    $(window).scroll(function(event){

        var header = $('#fh5co-header'),
            scrlTop = $(this).scrollTop();

        if ( scrlTop > 500 && scrlTop <= 2000 ) {
            header.addClass('navbar-fixed-top slideInDown');
        } else if ( scrlTop <= 500) {
            if ( header.hasClass('navbar-fixed-top') ) {
                header.addClass('navbar-fixed-top slideOutUp');
                setTimeout(function(){
                    header.removeClass('navbar-fixed-top slideInDown slideOutUp');
                }, 100 );
            }
        }

    });
};

$(function(){
    windowScroll();
    homeCarrousel();
    console.log("ok");
});




