/* globals Camera */
'use strict';

(function() {
  var app = angular.module('lib.camera', ['ngCordova', 'config']);
  app.factory('Camera', function($cordovaCamera) {
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
      getPicture: getPicture
    };
  });
})();
