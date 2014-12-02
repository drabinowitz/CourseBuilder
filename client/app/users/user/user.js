angular.module('CB.users.user',[
  'ui.router',
  'CB.users'
])

.controller('userController',['$scope','$stateParams','users',
function($scope,$stateParams,users){

   users.get($stateParams.userId).then(function(user){
     $scope.user = user;
   });

}]);
