angular.module('CB.courses.course',[
  'ui.router'
])

.controller('courseController',['$scope','$stateParams','course',
function($scope,$stateParams,course){

  course.get($stateParams.courseId).then(function(course){
    $scope.course = course;
  });

  $scope.addLesson = function(){
    // course.addLesson($stateParams.courseId);
    // $scope.course = course.get($stateParams.courseId);
  };

}])

.factory('course',['$http',function($http){

  return {
    get: function(courseId){
      return $http.get('/courses/'+ courseId + '/lessons').then(function(results){
        return results.data;
      });
    },
    addLesson: function(courseId){
      course[courseId].lessons.push({
        name:'New Lesson',
        hours:3,
        id: course[courseId].lessons.length
      });
    }
  };

}]);
