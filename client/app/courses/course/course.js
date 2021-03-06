angular.module('CB.courses.course',[
  'ngFx',
  'ui.router',
  'lesson.link'
])

.controller('courseController',['$scope','$stateParams','course',
function($scope,$stateParams,course){

  $scope.newLesson = {};

  $scope.course = {lessons:[]};
  $scope.lessons = $scope.course.lessons;

  var progressBarUpdate = function () {
    $scope.progressBar = {
      'width': $scope.course.lessons.reduce(function (totalHours, lesson) {
        return totalHours + lesson.hours/$scope.course.hours * 100;
      }, 0) + 'px'
    };
  };

  progressBarUpdate();

  $scope.$watch('lessons', progressBarUpdate);

  if ($stateParams.courseId === '1'){$scope.isGuest = true;}

  course.get($stateParams.courseId).then(function(course){
    $scope.course = course;
    $scope.lessons = $scope.course.lessons;
  });

  $scope.addLesson = function(formIsValid){
    var order = 0;
    if($scope.course.lessons.length){
      order = $scope.course.lessons[$scope.course.lessons.length - 1].order;
    }
    if(formIsValid){
      course.add($stateParams.courseId,$scope.newLesson.name,$scope.newLesson.hours,order).then(function(lesson){
        $scope.course.lessons.push(lesson);
        $scope.newLesson = {};
      });
    }
  };

}])

.factory('course',['$http',function($http){

  return {
    get: function(id){
      return $http.get('/courses/'+ id + '/lessons').then(function(results){
        return results.data;
      });
    },
    add: function(id,name,hours,order){
      return $http.post('/courses/' + id + '/lessons',{
        name:name,
        hours:hours,
        order:order
      }).then(function(result){
        return result.data;
      });
    }
  };

}]);
