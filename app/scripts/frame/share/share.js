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
      cache: false,
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

  app.controller('ShareController', function($scope, $state, $rootScope, Connections, NavbarManager, PhotosManager, CameraManager) {
    NavbarManager.useShare();
    $scope.connections = Connections;

    var shareWith = {};
    $scope.addConnection = function addConnection(connection) {
      if (_.isUndefined(shareWith[connection.id])) {
        shareWith[connection.id] = true;
      } else {
        shareWith[connection.id] = !shareWith[connection.email];
      }
    };

    $rootScope.$on(NavbarManager.EVENTS.sharePicture, function() {
      var photosManager = new PhotosManager();
      var accounts = _.reduce(shareWith, function(sharedWith, toggled, email) {
        return toggled ? sharedWith.concat(email) : sharedWith;
      }, []);

      $state.go('app.cards');
      CameraManager.upload().then(function(photo) {
        photosManager.share(photo.id, accounts);
      });
    });
  });
})();
