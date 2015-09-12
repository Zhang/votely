'use strict';

(function() {
  var app = angular.module('vote.main', []);
  app.config(function($stateProvider, STATE) {
    $stateProvider.state(STATE.app, {
      url: '',
      cache: false,
      abstract: true,
      templateUrl: 'scripts/frame/main.html',
      controller: 'MainController',
      resolve: {
        isAuthenticated: function(AccountManager, $state, STATE) {
          return AccountManager.getCurrentAccount().then(function resolve() {
            return true;
          }, function reject() {
            $state.go(STATE.landingPage);
          });
        }
      }
    });
  });

  app.controller('MainController', function($scope, AccountManager) {
    $scope.logout = AccountManager.logout;
  });
})();
