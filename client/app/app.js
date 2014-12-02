angular.module('CB', [
  'CB.welcome',
  'CB.users.user',
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
    .state('users', {
      abstract: true,
      template: '<div ui-view></div'
    })
    .state('users.user', {
      url: '/users/:userCode',
      templateUrl: 'app/users/user/user.html',
      controller: 'userController'
    })
    .state('users.user.courses', {
      url: '/users/:userCode/courses',
      templateUrl: 'app/users/user/courses/courses.html',
      controller: 'coursesController'
    });
}]);
