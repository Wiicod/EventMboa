'use strict';

var template_url='templates/'; // chemin vers le dossier des templates
//definition de tout les modules
var controller =angular.module('em-admin.controllers', ['ui.router']);
var service =angular.module('em-admin.services', ['ui.router']);
var directive =angular.module('em-admin.directives', ['ui.router']);
var config =angular.module('em-admin.config', ['ui.router']);
var filter =angular.module('em-admin.filter', ['ui.router']);

// Declare app level module which depends on views, and components
angular.module('em-admin', [
  'ui.router',
  'ng-admin',
  'ng-admin.jwt-auth',
  'em-admin.config'
]).
    run(['$log','$state','$rootScope','$location',
      function($log,$state,$rootScope,$location){
      }])
;
