'use strict';

(function() {
  var app = angular.module('vote.connections', ['vote.managers.account', 'vote.managers.navbar', 'vote.partials.connectionList']);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.connections', {
      url: '/connections',
      cache: false,
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

  app.controller('ConnectionsController', function($scope, Connections, NavbarManager) {
    NavbarManager.useConnections();
    $scope.connections = Connections;
  });
})();
