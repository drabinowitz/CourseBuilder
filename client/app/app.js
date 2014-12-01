angular.module('CB', [
  'CB.welcome',
  'ngFx',
  'ui.router'
])
.config(['$stateProvider','$urlRouterProvider', '$httpProvider',
function($stateProvider,$urlRouterProvider,$httpProvider){
  $urlRouterProvider.otherwise('/Welcome');

  $stateProvider
    .state('welcome', {
      url: '/Welcome',
      templateUrl: 'app/welcome/welcome.html',
      controller: 'WelcomeController'
    })
    .state('users', {})
    .state('users.user', {
      url: '/users/:userCode',
      templateUrl: 'app/users/user/user.html',
      controller: 'UserController'
    })
    .state('users.user.courses', {
      url: '/users/:userCode/courses',
      templateUrl: 'app/users/user/courses/courses.html',
      controller: 'CoursesController'
    });
}]);
