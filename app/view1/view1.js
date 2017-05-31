'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'api', 'dataStore', function($scope, api, dataStore) {

  $scope.users = dataStore.get('users');
  $scope.selectedUser = null;

  api.getUsers();

  $scope.refreshUsers = function() {
    api.getUsers();
  };

  $scope.selectUser = function(user) {
    $scope.selectedUser = Object.assign({}, user);
  };

  $scope.clearSelectedUser = function() {
    $scope.selectedUser = null;
  };

  $scope.updateUser = function() {
    var url = '//ec2-54-212-225-178.us-west-2.compute.amazonaws.com:8080/users/' + $scope.selectedUser.id;
    api.put(url, $scope.selectedUser)
      .then(function() {
        // Some toast here to indicate success
        $scope.clearSelectedUser();
        $scope.refreshUsers();
      });
  };

}]);