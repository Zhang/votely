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
    $scope.login = function(email, password) {
      AccountManager.login(email, password).then(function resolve() {
        $state.go('app.cards');
      }, function reject() {
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Failed login, please make sure your credentials are correct and try again'
        });
      });
    };
    $scope.signup = function(email, password) {
      AccountManager.signup(email, password).then(function resolve() {
        $state.go('app.cards');
      }, function reject() {
        $ionicPopup.alert({
          title: 'Invalid Email',
          template: 'Seems like someone is already using that email address, and you cannot claim it'
        });
      });
    };
  });
})();

