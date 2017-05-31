'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  var $controller;

  beforeEach(inject(function($rootScope, $_controller_) {
    $scope = $rootScope.$new();

    $controller = $_controller_('view1 as v1');

    spyOn($scope.mc, 'refreshUsers').and.callThrough();
  }));

  describe('view1 controller', function(){

    it('should initialize the controller', function() {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    });

  });
});