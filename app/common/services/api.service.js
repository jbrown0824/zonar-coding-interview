'use strict';

angular.module('myApp')

  .service('api', ['$http', 'dataStore', function ($http, dataStore) {
    var self = $http;

    self.prefix =  '//ec2-54-212-225-178.us-west-2.compute.amazonaws.com:8080/';

    self.getForDataStore = function(name, url) {
      url = url || name;

      dataStore.setLoading(name);

      return $http.get(self.prefix  + url)
        .then(function (response) {
          dataStore.set(name, response.data);
        });
    }

    self.getUsers = function () {
      return self.getForDataStore('users');
    };

    self.getBooks = function () {
      return self.getForDataStore('books');
    };

    self.deleteBook = function(bookId) {
      return self.delete(self.prefix + '/books/' + bookId);
    }

    self.getWishlists = function() {
      return self.getForDataStore('wishlists', 'wishlist');
    }

    return self;

  }]);