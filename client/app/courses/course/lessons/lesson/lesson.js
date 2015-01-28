angular.module('CB.courses.course.lessons.lesson',[
  'CB.courses.course',
  'ui.router',
  'ngFx'
])

.controller('lessonController',['$scope','$stateParams','lesson',
function($scope,$stateParams,lesson){

  $scope.newAssignment = {};

  $scope.lesson = {assignments: []};
  $scope.assignments = $scope.lesson.assignments;

  if ($stateParams.courseId === '1'){$scope.isGuest = true;}

  lesson.get($stateParams.courseId,$stateParams.lessonId).then(function(lesson){
    $scope.lesson = lesson;
    $scope.assignments = $scope.lesson.assignments;
  });

  var progressBarUpdate = function () {
    if ($scope.lesson.assignments) {
      $scope.progressBar = {
        'width': $scope.lesson.assignments.reduce(function (totalHours, assignment) {
          return totalHours + assignment.hours/$scope.lesson.hours * 100;
        }, 0) + 'px'
      };
    }
  };

  progressBarUpdate();

  $scope.$watch('assignments', progressBarUpdate);

  $scope.addAssignment = function(formIsValid){
    var order = 0;
    if($scope.lesson.assignments.length){
      order = $scope.lesson.assignments[$scope.lesson.assignments.length - 1].order;
    }
    if(formIsValid){
      lesson.add($stateParams.courseId,$stateParams.lessonId,$scope.newAssignment.name,'text',$scope.newAssignment.hours,order,$scope.newAssignment.body).then(function(assignment){
        $scope.lesson.assignments.push(assignment);
      });
    }
  };
}])

.factory('lesson',['$http',function($http){
  return {
    get: function(courseId,lessonId){
      return $http.get('/courses/' + courseId + '/lessons/' + lessonId + '/assignments').then(function(result){
        return result.data;
      });
    },
    add: function(courseId,lessonId,name,type,hours,order,body){
      return $http.post('/courses/' + courseId + '/lessons/' + lessonId + '/assignments',{
        name:name,
        type:type,
        hours:hours,
        order:order,
        body:body
      }).then(function(result){
        return result.data;
      });
    }
  };
}]);
