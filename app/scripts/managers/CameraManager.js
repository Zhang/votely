'use strict';

(function() {
  var app = angular.module('vote.managers.camera', ['config', 'lib.camera']);
  app.factory('CameraManager', function(ENV, Camera, $cordovaFileTransfer) {
    var CameraManager = {
      getAndUploadPicture: function getAndUploadPicture() {
        var options = {
            fileKey: 'avatar',
            fileName: 'image.jpeg',
            chunkedMode: false,
            mimeType: 'image/jpeg'
        };

        Camera.getPicture().then(function success(data) {
          $cordovaFileTransfer.upload(ENV + 'photos', data, options).then(function(result) {
            console.log('SUCCESS: ' + JSON.stringify(result.response));
          }, function(err) {
            console.log('ERROR: ' + JSON.stringify(err));
          });
        });
      }
    };
    return CameraManager;
  });
})();
