'use strict';

var template_url='templates/'; // chemin vers le dossier des templates
//definition de tout les modules
var controller =angular.module('mboa.controllers', ['ui.router']);
var service =angular.module('mboa.services', ['ui.router']);
var directive =angular.module('mboa.directives', ['ui.router']);
var config =angular.module('mboa.config', ['ui.router']);
var filter =angular.module('mboa.filter', ['ui.router']);

// Declare app level module which depends on views, and components
angular.module('mboa', [
  'ui.router',
  'satellizer',
  //'mp.datePicker',
  'satellizer',
  'restangular',
  'textAngular',
  'ngFileUpload',
  'angularUtils.directives.dirPagination',
  'mboa.controllers',
  'mboa.services',
  'mboa.config',
  'mboa.directives',
  'mboa.filter'
]).run(['$log', '$state', '$rootScope', '$location', 'Restangular',
  function ($log, $state, $rootScope, $location, Restangular) {
        $log.debug("startApp running ");

    Restangular.all('contact').getList().then(function (data) {
      console.log(data);

    });
        //$rootScope.$on('$stateChangeStart',function(event,toState,toParams,fromState){
        //  console.log("");
        //})



      }])


;
