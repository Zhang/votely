'use strict';

(function() {
  var app = angular.module('vote.navbar', ['ngCordova']);
  app.directive('navbar', function() {
    return {
      templateUrl: 'scripts/frame/navbar/navbar.html',
      controller: function($scope, Camera, $cordovaFileTransfer) {
        $scope.getPicture = function() {
          var options = {
              fileKey: "avatar",
              fileName: "image.jpeg",
              chunkedMode: false,
              mimeType: "image/jpeg"
          };

          Camera.getPicture().then(function success(data) {
            //change this
            $cordovaFileTransfer.upload("http://10.0.2.2:3000/photos", data, options).then(function(result) {
              console.log("SUCCESS: " + JSON.stringify(result.response));
            }, function(err) {
              console.log("ERROR: " + JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
            });
          });
        }
      }
    };
  });
})();
