describe('course',function(){

  describe('course factory',function(){
    var course,$httpBackend;
    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      course = $injector.get('course');
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should pull up the lesson ids for a course',function(){
      var mockCourse = {'lessons':[{},{},{}]};
      $httpBackend.expectGET('/courses/1/lessons').respond(mockCourse);
      course.get(1).then(function(course){
        expect(course).to.eql(mockCourse);
      });
      $httpBackend.flush();
    });

    it('should post new courses', function(){
      var newMockLesson = {'name':'new'};
      $httpBackend.expectPOST('/courses/1/lessons').respond(newMockLesson);
      course.add(1).then(function(lesson){
        expect(lesson).to.eql(newMockLesson);
      });
      $httpBackend.flush();
    });
  });

  describe('courseController', function(){
    var $scope,$stateParams,$rootScope,$controller,createController,course,mockCourse,mockLesson;

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $stateParams = $injector.get('$stateParams');
      $stateParams.courseId = 0;
      $controller = $injector.get('$controller');

      mockCourse = {name:'testcourse'};

      mockLesson = {name:'testlesson'};

      course = {
        get:function(courseId){
          var course = {
            '0': mockCourse
          };
          return {
            then: function(cb){
              cb(course[courseId]);
            }
          };
        },
        add:function(id){
          return {
            then: function(cb){
              cb(mockLesson);
            }
          };
        }
      };
      createController = function(){
        return $controller('courseController',{
          $scope:$scope,
          $stateParams:$stateParams,
          course:course
        });
      };
    }));

    it('should load the course with its associated lesson',function(){
      createController();
      expect($scope.course).to.equal(mockCourse);
    });

    it('should allow users to add lessons',function(){
      createController();
      $scope.course = {};
      $scope.course.lessons=[];
      $scope.addLesson(true);
      expect($scope.course.lessons[0]).to.equal(mockLesson);
    });
  });

});
