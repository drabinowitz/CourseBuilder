angular.module('CB.users',[])

.factory('users', ['$http',function($http){
  return {
    get: function(id){
      return $http.get('/users/' + id + '/courses').then(function(result){
        return result.data;
      });
    }
  };
}]);
