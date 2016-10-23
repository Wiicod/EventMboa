/**
 * Created by Thedward on 10/08/2016.
 */
//pas besion met juste les chemins en relatif
var adresse="http://Ip_adreess/app_name/";


/******************************************************************************************************************
 Sercives
 *****************************************************************************************************************/
service

    .factory('NameFactory', ['$http', '$filter', '$q', '$rootScope',
    function ($http,$filter,$q,$rootScope) {

        var factory = {
            attrib1: false,
            getAttribut: function (obj) {
                var deferred = $q.defer();
                $http.get(adresse).success(function(data,status){
                    factory.attrib1 = data;
                    deferred.resolve(factory.attrib1);

                }).error(function(data,status){
                    console.log(status);
                    deferred.reject('Impossible de recuperer les indicateurs');
                });

                return deferred.promise;

            },
            addAttrib: function (obj) {
                var deferred = $q.defer();
                //console.log(obj);
                $http.post(adresse+"indicateur",JSON.stringify(obj)).
                    success(function(data,status){
                        deferred.resolve(data);
                    }).error(function(data,status){
                        console.log(data);
                        console.log(status);
                        //deferred.reject('Impossible de recuperer les users');
                    });
                return deferred.promise;
            }
        }

        return factory

    }])

    //juste si necessaire (par exemple pour faire un certains traitement avant de retourner au contronlleur ou autre
    // methode )
    // sinon u pas besion de declare les factories
    .factory("Events",
        ["Restangular", function (Restangular) {
            var service = Restangular.service("event");
            // I can add custom methods to my Students service
            // by adding functions here service
            service.autremethode = function (event) {
                //validate student data
            };
            return service;
        }]);
