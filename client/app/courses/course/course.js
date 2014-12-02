angular.module('CB.courses.course',[])

.controller('courseController',['$scope','$stateParams','course',
function($scope,$stateParams,course){
  $scope.course = course.get($stateParams.courseCode);
}])

.factory('course',[function(){

  var course = {
    '0':{

      name:'Guest Course',

      hours: 10,

      lessons:[
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
      ]
    }
  };

  return {
    get: function(courseId){
      return course[courseId];
    }
  };

}]);
