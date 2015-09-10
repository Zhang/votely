'use strict';

(function() {
  var app = angular.module('vote.share', [
    'vote.managers.camera',
    'vote.managers.account',
    'vote.managers.navbar',
    'vote.partials.connectionList'
  ]);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.share', {
      url: '/share',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/share/share.html',
          controller: 'ShareController'
        }
      },
      resolve: {
        Connections: function(AccountManager) {
          return AccountManager.getConnections();
        }
      }
    });
  });

  app.controller('ShareController', function($scope, $rootScope, Connections, NavbarManager, CameraManager) {
    NavbarManager.useShare();
    $scope.picture = CameraManager.picture;
    $scope.connections = Connections;
  });
})();
