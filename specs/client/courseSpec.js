describe('course',function(){

  describe('course factory',function(){
    var course;
    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      course = $injector.get('course');
    }));

    it('should pull up the lesson ids for a course',function(){
      var guestCourse = course.get(0);
      expect(guestCourse.name).to.equal('Guest Course');
      expect(guestCourse.hours).to.equal(10);
      expect(guestCourse.lessons).to.eql([
        {
          name:'lesson1',
          hours:3,
          id:0
        },
        {
          name:'lesson2',
          hours:4,
          id:1
        },
        {
          name:'lesson3',
          hours:3,
          id:2
        }
      ]);
    });
  });

  describe('courseController', function(){
    var $scope,$stateParams,$rootScope,$controller,createController,course,mockCourse;
    mockCourse = {
      name:'testcourse',
      hours:10,
      lessons:[
        {
          name:'testlesson1',
          hours:4,
          id:0
        },
        {
          name:'testlesson2',
          hours:6,
          id:1
        }
      ]
    };
    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $stateParams = $injector.get('$stateParams');
      $stateParams.courseCode = 0;
      $controller = $injector.get('$controller');
      course = {
        get:function(courseId){
          var course = {
            '0': mockCourse
          };
          return course[courseId];
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
  });

});
