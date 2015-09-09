'use strict';

(function() {
  var app = angular.module('vote.navbar', ['ngCordova', 'vote.managers.camera', 'vote.managers.navbar']);
  app.directive('navbar', function() {
    return {
      templateUrl: 'scripts/frame/navbar/navbar.html',
      controller: function($scope, NavbarManager) {
        $scope.navbarManager = NavbarManager;
      }
    };
  });
})();
