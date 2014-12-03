describe('auth',function(){

  describe('auth factory',function(){
    var auth,$httpBackend;
    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      auth = $injector.get('auth');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should request the user',function(){
      var mockUser = {'name':'test'};
      $httpBackend.expectGET('/users').respond(mockUser);
      auth.get().then(function(user){
        expect(user).to.equal(mockUser);
      });
    });

  });

  describe('auth controller', function(){
    var $scope,$rootScope,$controller,createController,auth,mockUser;

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $controller = $injector.get('$controller');
      mockUser = {name:'test'};

      auth = {
        get: function(){
          return {
            then: function(cb){
              cb(mockUser);
            }
          };
        }
      };

      createController = function(){
        return $controller('authController',{
          $scope:$scope,
          auth:auth
        });
      };
    }));

    it('should load the user if it logged in', function(){
      createController();
      expect($scope.user).to.equal(mockUser);
    });
  });

});
