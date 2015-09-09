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
        Friends: function(AccountManager) {
          return AccountManager.getFriends();
        }
      }
    });
  });

  app.controller('ConnectionsController', function($scope, Friends, NavbarManager) {
    NavbarManager.useConnections();
    $scope.friends = Friends;
  });
})();
