describe('courses', function(){

  describe('courses factory', function() {
    var courses,$httpBackend;
    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      courses = $injector.get('courses');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should get the courses for an associated user', function() {
      var mockUser = {'courses':[{},{},{}]};
      $httpBackend.expectGET('/users/1/courses').respond(mockUser);
      courses.get(1).then(function(user){
        expect(user).to.eql(mockUser);
      });
      $httpBackend.flush();
    });
  });

  describe('coursesController',function(){
    var $scope, $rootScope, $stateParams, createController, courses, mockCourse;

    mockUser = {'courses':[{
      name:'testcourse',
      hours:10
    }]};

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){

      $rootScope = $injector.get('$rootScope');
      $stateParams = $injector.get('$stateParams');
      $scope = $rootScope.$new();

      courses = {
        get: function(){
          return {
            then:function(cb){
              cb(mockUser);
            }
          };
        }
      };

      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('coursesController', {
          $scope:$scope,
          $stateParams:$stateParams,
          courses:courses
        });
      };
    }));

    it('should load the courses for the associated user', function() {
      createController();
      expect($scope.user).to.equal(mockUser);
    });
  });
});
