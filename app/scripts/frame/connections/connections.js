'use strict';

(function() {
  var app = angular.module('vote.connections', ['vote.managers.account', 'vote.managers.navbar']);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.connections', {
      url: '/connections',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/connections/connections.html',
          controller: 'ConnectionsController'
        }
      },
      resolve: {
        Connections: function(AccountManager) {
          return AccountManager.getConnections();
        }
      }
    });
  });

  app.controller('ConnectionsController', function($scope, $rootScope, Connections, NavbarManager, AccountManager) {
    NavbarManager.useConnections();
    $scope.connections = Connections;
    $scope.showAdd = false;
    $rootScope.$on(NavbarManager.EVENTS.addConnection, function() {
      $scope.showAdd = true;
    });
    $scope.connect = function(email) {
      $scope.showAdd = false;
      AccountManager.connect(email);
    };
  });
})();
