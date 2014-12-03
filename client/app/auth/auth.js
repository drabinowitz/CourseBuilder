angular.module('CB.auth',[])

.controller('authController',['$scope','auth',function($scope,auth){
  auth.get().then(function(user){
    $scope.user = user;
  });
}])

.factory('auth',['$http',function($http){
  return {
    get: function(){
      return $http.get('/users').then(function(result){
        return result.data;
      }).catch(function(err){
        return false;
      });
    }
  };
}]);
