'use strict';

(function() {
  var app = angular.module('vote.navbar', ['ngCordova', 'vote.managers.camera']);
  app.directive('navbar', function() {
    return {
      templateUrl: 'scripts/frame/navbar/navbar.html',
      controller: function($scope, CameraManager) {
        $scope.getPicture = CameraManager.getAndUploadPicture;
      }
    };
  });
})();
