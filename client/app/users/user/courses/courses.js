angular.module('CB.users.user.courses',[
  'CB.users.user'
])

.controller('coursesController',['$scope','$stateParams','courses',function($scope,$stateParams,courses){

  $scope.newCourse = {};

  courses.get($stateParams.userId).then(function(user){
    $scope.user = user;
  });

  $scope.addCourse = function(formIsValid){
    if (formIsValid){
      courses.add($stateParams.userId,$scope.newCourse.name,$scope.newCourse.hours).then(function(course){
        $scope.newCourse = {};
        $scope.user.courses.push(course);
      });
    }
  };

}])

.factory('courses',['$http',function($http){

  return {
    get: function(id){
      return $http.get('/users/' + id + '/courses').then(function(result){
        return result.data;
      });
    },
    add: function(id,name,hours){
      return $http.post('/users/' + id + '/courses',{
        name:name,
        hours:hours
      }).then(function(result){
        return result.data;
      });
    }
  };
}]);
