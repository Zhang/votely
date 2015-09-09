'use strict';

(function() {
  var app = angular.module('vote.login', ['vote.managers.account']);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.login', {
      url: '/login',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/login/login.html',
          controller: 'LoginController'
        }
      }
    });
  });

  app.controller('LoginController', function($scope, AccountManager) {
    var accountManager = new AccountManager();
    $scope.signup = accountManager.signup;
  });
})();
