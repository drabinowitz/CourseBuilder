angular.module('CB.courses.course.lessons.lesson',[
  'CB.courses.course',
  'ui.router'
])

.controller('lessonController',['$scope','$stateParams','lesson',
function($scope,$stateParams,lesson){
  lesson.get($stateParams.courseId,$stateParams.lessonId).then(function(lesson){
    $scope.lesson = lesson;
  });
}])

.factory('lesson',['$http',function($http){
  return {
    get: function(courseId,lessonId){
      return $http.get('/courses/' + courseId + '/lessons/' + lessonId + '/assignments').then(function(result){
        return result.data;
      });
    }
  };
}]);
