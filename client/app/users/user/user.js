angular.module('CB.users.user',[
  'ui.router',
  'CB.users'
])

.controller('userController',['$scope','$stateParams','users',
function($scope,$stateParams,users){

  $scope.user = users.get($stateParams.userId);

}]);
