angular.module('CB', [
  'CB.welcome',
  'CB.courses.course.lessons.lesson',
  'CB.users.user.courses',
  'ngFx',
  'ui.router'
])
.config(['$stateProvider','$urlRouterProvider', '$httpProvider',
function($stateProvider,$urlRouterProvider,$httpProvider){
  $urlRouterProvider.otherwise('/welcome');

  $stateProvider
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'app/welcome/welcome.html',
      controller: 'welcomeController'
    })
    .state('getting-started', {
      url: '/getting-started',
      templateUrl: 'app/gettingStarted/gettingStarted.html'
    })
    .state('users', {
      url: '/users',
      abstract: true,
      template: '<div ui-view></div'
    })
    .state('users.user', {
      url: '/:userId',
      templateUrl: 'app/users/user/user.html',
      controller: 'userController'
    })
    .state('users.user.courses', {
      url: '/courses',
      templateUrl: 'app/users/user/courses/courses.html',
      controller: 'coursesController'
    })
    .state('courses', {
      url: '/courses',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('courses.course', {
      url: '/:courseId',
      templateUrl: 'app/courses/course/course.html',
      controller: 'courseController'
    })
    .state('courses.course.lessons', {
      url: '/lessons',
      abstract: true,
      template: '<div ui-view></div>'
    })
    .state('courses.course.lessons.lesson', {
      url: '/:lessonId',
      templateUrl: 'app/courses/course/lessons/lesson/lesson.html',
      controller: 'lessonController'
    });
}]);
