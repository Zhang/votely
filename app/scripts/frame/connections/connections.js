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

  app.controller('ConnectionsController', function($scope, $rootScope, Friends, NavbarManager, AccountManager) {
    NavbarManager.useConnections();
    $scope.friends = Friends;
    $scope.showAdd = false;
    $rootScope.$on(NavbarManager.EVENTS.addConnection, function() {
      $scope.showAdd = true;
    });
    $scope.connect = AccountManager.connect;
  });
})();
