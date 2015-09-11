'use strict';

(function() {
  var app = angular.module('vote.main', []);
  app.config(function($stateProvider) {
    $stateProvider.state('app', {
      url: '',
      cache: false,
      abstract: true,
      templateUrl: 'scripts/frame/sidebar.html',
      controller: 'MainController',
    });
  });

  app.controller('MainController', function($scope, $state, AccountManager) {
    (function() {
      AccountManager.getCurrentAccount().then(function resolve() {
        $state.go('app.cards');
      }, function reject() {
        $state.go('landingPage');
      });
    })();

    $scope.logout = AccountManager.logout;
  });
})();
