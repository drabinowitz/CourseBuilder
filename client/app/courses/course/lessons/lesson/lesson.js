angular.module('CB.courses.course.lessons.lesson',[
  'CB.courses.course',
  'ui.router'
])

.controller('lessonController',['$scope','$stateParams','lesson',
function($scope,$stateParams,lesson){
  $scope.lesson = lesson.get($stateParams.lessonId);
}])

.factory('lesson',function(){
  var lesson = {
    '0': {
      name: 'lesson1',
      hours: 3,
      id: 0,
      templates:[
        {
          type:'text',
          body:'Here is the first lesson',
          id:0
        },
        {
          type:'text',
          body:'It can have many templates',
          id:1
        }
      ]
    }
  };

  return {
    get: function(lessonId){
      return lesson[lessonId];
    }
  };
});
