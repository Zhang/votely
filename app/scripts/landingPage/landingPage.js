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

  app.controller('LandingController', function($scope, $state, AccountManager, $ionicPopup) {
    var accountManager = new AccountManager();
    $scope.signup = function(email, password) {
      accountManager.signup(email, password).then(function resolve() {
        $state.go('app.cards');
      }, function reject() {
        $ionicPopup.alert({
          title: 'Invalid Email',
          template: 'Seems like someone is already using that email address, and you wont be able to claim it'
        });
      });
    };
  });
})();

