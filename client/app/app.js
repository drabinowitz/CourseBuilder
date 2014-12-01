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
    });
}]);
