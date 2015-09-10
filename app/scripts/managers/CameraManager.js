'use strict';

(function() {
  var app = angular.module('vote.managers.camera', ['config', 'lib.camera']);
  app.factory('CameraManager', function(ENV, Camera, $cordovaFileTransfer) {
    var CameraManager = {
      getAndUploadPicture: function getAndUploadPicture(onSuccess, onFailure) {
        var options = {
            fileKey: 'avatar',
            fileName: 'image.jpeg',
            chunkedMode: false,
            mimeType: 'image/jpeg'
        };
        onSuccess = onSuccess || function success(result) { console.log('Success: ' + JSON.stringify(result.response)); };
        onFailure = onFailure || function success(err) { console.log('Error: ' + JSON.stringify(err)); };
        return function getAndUploadPicture() {
          Camera.getPicture().then(function success(data) {
            $cordovaFileTransfer.upload(ENV + 'photos', data, options).then(onSuccess, onFailure);
          });
        };
      }
    };

    return CameraManager;
  });
})();
