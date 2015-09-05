'use strict';

(function() {
  var app = angular.module('lib.camera', ['ngCordova']);
  app.factory('Camera', function($cordovaCamera) {
    return {
      getPicture: function getPicture() {
        var config = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        return $cordovaCamera.getPicture(config);
      }
    }
  });
})();
