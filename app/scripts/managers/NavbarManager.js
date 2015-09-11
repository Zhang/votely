'use strict';

(function() {
  var app = angular.module('vote.managers.navbar', ['vote.managers.camera']);
  app.factory('NavbarManager', function(CameraManager, $rootScope, $state) {
    var EVENTS = {
      addConnection: 'navbar-add-connection',
      sharePicture: 'navbar-share-picture'
    };
    var cameraSettings = {
      rightIcon: 'ion-camera',
      action: function() {
        CameraManager.getPicture().then(function success() {
          $state.go('app.share');
        });
      }
    };
    var connectionSettings = {
      rightIcon: 'ion-plus-round',
      action: function() {
        $rootScope.$broadcast(EVENTS.addConnection);
      }
    };

    var shareSettings = {
      rightIcon: 'ion-checkmark-round',
      action: function() {
        $rootScope.$broadcast(EVENTS.sharePicture);
      }
    };

    return {
      settings: cameraSettings,
      useConnections: function() {
        this.settings = connectionSettings;
      },
      useCamera: function() {
        this.settings = cameraSettings;
      },
      useShare: function() {
        this.settings = shareSettings;
      },
      EVENTS: EVENTS
    };
  });
})();
