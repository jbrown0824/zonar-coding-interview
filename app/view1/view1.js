'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'api', 'dataStore', function($scope, api, dataStore) {
  api.getUsers();
  api.getBooks();
  api.getWishlists();

  $scope.users = dataStore.get('users');
  $scope.books = dataStore.get('books');
  $scope.selectedUser = null;

  $scope.refreshUsers = function() {
    api.getUsers();
    api.getWishlists();
  };

  $scope.selectUser = function(user) {
    $scope.selectedUser = Object.assign({}, user);
  };

  $scope.getUserWishlist = function(userId) {
    var wishlists = dataStore.get('wishlists');

    // @TODO - display a waiting to load indicator
    if (wishlists.data.length === 0) return [];

    return wishlists.data
      .filter(function(wishlistItem) { return wishlistItem.user_id === userId; })
      .map(function(wishlistItem) {
        return $scope.books.data.find(function(book) {
          return book.id === wishlistItem.book_id;
        });
      });
  };

  $scope.clearSelectedUser = function() {
    $scope.selectedUser = null;
  };

  $scope.updateUser = function() {
    var url = api.prefix + 'users/' + $scope.selectedUser.id;
    api.put(url, $scope.selectedUser)
      .then(function() {
        // Some toast here to indicate success
        $scope.clearSelectedUser();
        $scope.refreshUsers();
      });
  };

}]);