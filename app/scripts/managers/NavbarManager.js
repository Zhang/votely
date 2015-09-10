'use strict';

(function() {
  var app = angular.module('vote.managers.navbar', ['vote.managers.camera']);
  app.factory('NavbarManager', function(CameraManager, $rootScope, $state) {
    var EVENTS = {
      addConnection: 'navbar-add-connection',
      pictureUploaded: 'navbar-picture-added'
    };
    var cameraSettings = {
      rightIcon: 'ion-camera',
      action: CameraManager.getAndUploadPicture(function success(res) {
        CameraManager.setCurrentPhoto(res);
        $state.go('app.share');
      })
    };

    var connectionSettings = {
      rightIcon: 'ion-plus-round',
      action: function() {
        $rootScope.$broadcast(EVENTS.addConnection);
      }
    };

    var shareSettings = {};

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
