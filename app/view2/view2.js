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
  $scope.users = dataStore.get('users');
  $scope.books = dataStore.get('books');

  $scope.selectBook = function(book) {
    $scope.selectedBook = book;
  };

  $scope.refreshBooks = function() {
    api.getBooks();
  };

  $scope.clearSelectedBook = function() {
    $scope.selectedBook = null;
  };

  $scope.addToWishlist = function() {
    var url = api.prefix + 'wishlist/users/' + $scope.addBook.user.id + '/books/' + $scope.selectedBook.id;
    api.post(url, $scope.selectedUser)
      .then(function() {
        // Some toast here to indicate success
        alert('Book added to ' + $scope.addBook.user.first_name + '\'s wishlist');

        api.getBooks();
        api.getWishlists();
      });
  }

  $scope.deleteBook = function(bookId) {
    if (window.confirm('Are you sure?')) {
      api.deleteBook(bookId).then(function () {
        alert('book deleted');
        $scope.clearSelectedBook();
      });
    }
  };

}]);