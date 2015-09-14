'use strict';

(function() {
  var app = angular.module('vote.connections', ['vote.managers.account', 'vote.managers.navbar', 'vote.partials.connectionList']);

  app.config(function($stateProvider, STATE) {
    $stateProvider

    .state(STATE.connections, {
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

  app.controller('ConnectionsController', function($scope, Connections, NavbarManager, $state, STATE) {
    NavbarManager.useCamera();
    $scope.connections = Connections;
    $scope.visitConnection = function(connection) {
      $state.go(STATE.voting, {connection: connection.id});
    };
    // TODO: add how to add connection
    // $scope.addConnection = function addConnection() {
    //   $state.go(STATE.addConnectionn);
    // };
  });
})();
