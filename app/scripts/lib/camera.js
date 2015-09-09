/* globals Camera */
'use strict';

(function() {
  var app = angular.module('lib.camera', ['ngCordova', 'config']);
  app.factory('Camera', function($cordovaCamera, $cordovaFileTransfer, ENV) {
    function getPicture() {
      var config = {
          quality : 100,
          destinationType : Camera.DestinationType.FILE_URI,
          sourceType : Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          saveToPhotoAlbum: false
      };

      return $cordovaCamera.getPicture(config);
    }

    return {
      getPicture: getPicture,
      getAndUploadPicture: function getAndUploadPicture() {
        var options = {
            fileKey: 'avatar',
            fileName: 'image.jpeg',
            chunkedMode: false,
            mimeType: 'image/jpeg'
        };

        getPicture().then(function success(data) {
          $cordovaFileTransfer.upload(ENV + 'photos', data, options).then(function(result) {
            console.log('SUCCESS: ' + JSON.stringify(result.response));
          }, function(err) {
            console.log('ERROR: ' + JSON.stringify(err));
          });
        });
      }
    };
  });
})();
