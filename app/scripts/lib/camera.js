/* globals Camera */
'use strict';

(function() {
  var app = angular.module('lib.camera', ['ngCordova']);
  app.factory('Camera', function($cordovaCamera) {
    return {
      getPicture: function getPicture() {
        var config = {
            quality : 100,
            destinationType : Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };

        return $cordovaCamera.getPicture(config);
      }
    };
  });
})();
