'use strict';

angular.module('myApp')

  .service('api', ['$http', 'dataStore', function ($http, dataStore) {
    var self = $http;

    self.getUsers = function () {
      var users = dataStore.get('users');
      dataStore.setLoading('users');

      $http.get('//ec2-54-212-225-178.us-west-2.compute.amazonaws.com:8080/users')
        .then(function (response) {
          dataStore.set('users', response.data);
        });
    };

    self.getBooks = function () {
      var books = dataStore.get('books');
      dataStore.setLoading('books');

      $http.get('//ec2-54-212-225-178.us-west-2.compute.amazonaws.com:8080/books')
        .then(function (response) {
          dataStore.set('books', response.data);
        });
    };

    return self;

  }]);