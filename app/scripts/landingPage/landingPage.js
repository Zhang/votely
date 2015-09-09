'use strict';

(function() {
  var app = angular.module('landingPage', ['vote.managers.account']);
  app.config(function($stateProvider) {
    $stateProvider

    .state('landingPage', {
      url: '/landing',
      templateUrl: 'scripts/landingPage/landingPage.html',
      controller: 'LandingController'
    });
  });

  app.controller('LandingController', function($scope, $state, AccountManager) {
    var accountManager = new AccountManager();
    $scope.signup = function(email, password) {
      accountManager.signup(email, password).then(function() {
        $state.go('app.cards');
      });
    };
  });
})();

