'use strict';

var template_url='templates/'; // chemin vers le dossier des templates
//definition de tout les modules
var controller =angular.module('mboa.controllers', ['ui.router']);
var service =angular.module('mboa.services', ['ui.router']);
var directive =angular.module('mboa.directives', ['ui.router']);
var config = angular.module('mboa.config', ['ui.router', 'restangular']);
var filter =angular.module('mboa.filter', ['ui.router']);

// Declare app level module which depends on views, and components
angular.module('mboa', [
  'ui.router',
  'satellizer',
  'gettext',
  'ngCookies',
  'restangular',
  'textAngular',
  'ngFileUpload',
  'angularUtils.directives.dirPagination',
  'mboa.controllers',
  'mboa.services',
  'mboa.config',
  'mboa.directives',
  'mboa.filter'
]).run(['$log', '$state', '$rootScope', '$location', 'Restangular', '$auth','gettextCatalog',
  function ($log, $state, $rootScope, $location, Restangular, $auth,gettextCatalog) {
        $log.debug("startApp running ");
    gettextCatalog.currentLanguage="fr_FR";
    gettextCatalog.debug=false;

    var attempt = 0;
    Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
      if (response.status === 401) {
        if (attempt <= 5) {
          attempt++;
          Restangular.one('refresh').get().then(function (response) {
            $auth.setToken(response.refreshToken);
            attempt = 0;
          }, function (err) {

          });
        } else {
          $state.go('home')
        }

        return false; // error handled
      } else {
        return true; // error not handled
      }


    });

    //Restangular.all('contact').getList().then(function (data) {
    //  console.log(data);
    //
    //});
        //$rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState){
        //  console.log("");
        //})



      }])


;
