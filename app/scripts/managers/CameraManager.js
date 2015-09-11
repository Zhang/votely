'use strict';

(function() {
  var app = angular.module('vote.managers.camera', ['config', 'lib.camera']);
  app.factory('CameraManager', function(ENV, Camera, $cordovaFileTransfer) {
    var CameraManager = {
      pendingPicture: {}
    };

    function getPicture() {
      return Camera.getPicture().then(function(data) {
        CameraManager.pendingPicture = data;
      });
    }

    CameraManager.getPicture = getPicture;
    CameraManager.upload =function upload() {
      var options = {
          fileKey: 'avatar',
          fileName: 'image.jpeg',
          chunkedMode: false,
          mimeType: 'image/jpeg'
      };

      return $cordovaFileTransfer.upload(ENV.apiEndpoint + 'photos', this.pendingPicture, options).then(function returnResJSON(res) {
        return JSON.parse(res.response);
      });
      //.then(onSuccess, onFailure);
    };

    return CameraManager;
  });
})();
