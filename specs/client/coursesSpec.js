describe('courses', function(){

  describe('courses factory', function() {
    var courses;
    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      courses = $injector.get('courses');
    }));

    it('should get the courses for an associated user', function() {
      var guestCourses = courses.get('0');
      expect(guestCourses[0].name).to.equal('Guest Course');
      expect(guestCourses[0].hours).to.equal(10);
    });
  });

  describe('coursesController',function(){
    var $scope, $rootScope, $stateParams, createController, courses, mockCourse;

    mockCourses = [{
      name:'testcourse',
      hours:10
    }];

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){

      $rootScope = $injector.get('$rootScope');
      $stateParams = $injector.get('$stateParams');
      $scope = $rootScope.$new();

      courses = {
        get: function(){
          return mockCourses;
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
      expect($scope.courses).to.equal(mockCourses);
    });
  });
});
