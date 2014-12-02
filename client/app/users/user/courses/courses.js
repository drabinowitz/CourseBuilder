angular.module('CB.users.user.courses',[
  'CB.users.user'
])

.controller('coursesController',['$scope','$stateParams','courses',function($scope,$stateParams,courses){

  courses.get($stateParams.userId).then(function(user){
    $scope.user = user;
  });

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
