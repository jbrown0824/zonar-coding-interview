'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);


var books = [
    {
      id: 1,
      author: 'Author',
      title: 'Title',
      summary: 'Summary'
    }
];

var users = [
    {
        email: 'email@gmail.com',
        id: 1,
        first_name: 'Bob',
        last_name: 'Bobberson'
    }
];