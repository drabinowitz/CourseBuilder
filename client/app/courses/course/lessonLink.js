angular.module('lesson.link', [])

.directive('lessonLink', function () {
  return {
    restrict: 'E',
    scope: {
      lesson: '=lesson'
    },
    replace: true,
    templateUrl: 'app/courses/course/lesson-link.html'
  };
});
