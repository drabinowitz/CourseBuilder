angular.module('CB.users.user.courses',[
  'CB.users.user'
])

.controller('coursesController',['$scope','$stateParams','courses',function($scope,$stateParams,courses){

  $scope.courses = courses.get($stateParams.userId);

}])

.factory('courses',['$http',function($http){

  return {
    get: function(id){
      return $http.get('/users/' + id + '/courses').then(function(result){
        return result.data;
      });
    }
  };
}]);
