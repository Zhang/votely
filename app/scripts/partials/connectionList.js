'use strict';

(function() {
  var app = angular.module('vote.partials.connectionList', ['vote.managers.account']);
  app.directive('connectionList', function() {
    return {
      $scope: {
        connections: '=',
        onClick: '=?'
      },
      templateUrl: 'scripts/partials/connectionList.html',
      controller: function(NavbarManager, $scope, $rootScope, AccountManager) {
        $scope.showAdd = false;
        $rootScope.$on(NavbarManager.EVENTS.addConnection, function() {
          $scope.showAdd = true;
        });

        $scope.connect = function(email) {
          $scope.showAdd = false;
          AccountManager.connect(email);
        };
      }
    };
  });
})();
