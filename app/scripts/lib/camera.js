'use strict';

(function() {
  var app = angular.module('lib.camera', []);
  app.factory('Camera', [function($cordovaCamera) {

    return {
      getPicture: function() {
        var options = {
          saveToPhotoAlbum: false
        };

        return $cordovaCamera.getPicture(options);
      }
    }
  }]);
})();
