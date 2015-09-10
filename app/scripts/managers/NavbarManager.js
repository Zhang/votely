'use strict';

(function() {
  var app = angular.module('vote.managers.navbar', ['vote.managers.camera']);
  app.factory('NavbarManager', function(CameraManager, $rootScope) {
    var EVENTS = {
      addConnection: 'navbar-add-connection'
    };
    var cameraSettings = {
      rightIcon: 'ion-camera',
      action: CameraManager.getAndUploadPicture
    };

    var connectionSettings = {
      rightIcon: 'ion-plus-round',
      action: function() {
        $rootScope.$broadcast(EVENTS.addConnection);
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
      EVENTS: EVENTS
    };
  });
})();
