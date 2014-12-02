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
    it('should add lessons to a course',function(){
      course.addLesson(0);
      var guestCourse = course.get(0);
      expect(guestCourse.lessons[3]).to.eql({
        name:'New Lesson',
        hours:3,
        id:3
      });
    });
  });

  describe('courseController', function(){
    var $scope,$stateParams,$rootScope,$controller,createController,course,mockCourse;

    beforeEach(module('CB'));
    beforeEach(inject(function($injector){
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      $stateParams = $injector.get('$stateParams');
      $stateParams.courseId = 0;
      $controller = $injector.get('$controller');

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

      course = {
        get:function(courseId){
          var course = {
            '0': mockCourse
          };
          return course[courseId];
        },
        addLesson:function(courseId){
          mockCourse.lessons.push({
            name:'testlesson3',
            hours:5,
            id:2
          });
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
      $scope.addLesson();
      expect($scope.course.lessons[2]).to.eql({
        name:'testlesson3',
        hours:5,
        id:2
      });
    });
  });

});
