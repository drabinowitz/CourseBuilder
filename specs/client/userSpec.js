'use strict';

describe('user', function() {
  var $scope, $rootScope, $stateParams, createController, users, mockUser;

  mockUser = {
    name:'test',
    courses: ['1'],
    id:0
  };

  beforeEach(module('CB'));
  beforeEach(inject(function($injector){

    $rootScope = $injector.get('$rootScope');
    $stateParams = $injector.get('$stateParams');
    $scope = $rootScope.$new();

    users = {
      get: function(){
        return mockUser;
      }
    };

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('userController', {
        $scope:$scope,
        $stateParams:$stateParams,
        users:users
      });
    };
  }));

  describe('userController', function() {

    it('should get user data for the associated user', function () {
      createController();
      expect($scope.user).to.equal(mockUser);
    });

  });
});
