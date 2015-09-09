'use strict';

(function() {
  var app = angular.module('lib.camera', ['ngCordova']);
  app.factory('Camera', function($cordovaCamera) {
    return {
      getPicture: function getPicture() {
        var config = {
            quality : 100,
            destinationType : $cordovaCamera.DestinationType.FILE_URI,
            sourceType : $cordovaCamera.PictureSourceType.CAMERA,
            encodingType: $cordovaCamera.EncodingType.JPEG,
            saveToPhotoAlbum: false
        };

        return $cordovaCamera.getPicture(config);
      }
    };
  });
})();
