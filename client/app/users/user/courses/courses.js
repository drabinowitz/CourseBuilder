angular.module('CB.users.user.courses',[
  'CB.users.user'
])

.controller('coursesController',['$scope','$stateParams','courses',function($scope,$stateParams,courses){

  $scope.courses = courses.get($stateParams.userCode);

}])

.factory('courses',[function(){
  var courses = {
    '0' : [
      {
        name:'Guest Course',
        hours:10
      },
      {
        name:'Guest Course2',
        hours:30
      }
    ]
  };

  return {
    get: function(userId){
      return courses[userId];
    }
  };
}]);
