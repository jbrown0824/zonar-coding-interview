'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'api', 'dataStore', function($scope, api, dataStore) {
  api.getBooks();
  api.getUsers();

  $scope.selectedBook = null;

  $scope.selectBook = function(book) {
    $scope.selectedBook = book;
  };

  $scope.refreshBooks = function() {
    api.getBooks();
  };

  $scope.addToWishlist = function() {
    var url = api.prefix + 'wishlist/users/' + $scope.addBook.user + '/books/' + $scope.selectedBook.id;
    api.post(url, $scope.selectedUser)
      .then(function() {
        // Some toast here to indicate success
        api.getBooks();
        api.getWishlists();
      });
  }

  $scope.books = dataStore.get('books');
}]);