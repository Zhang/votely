'use strict';

(function() {
  var app = angular.module('vote.navbar', ['ngCordova']);
  app.directive('navbar', function() {
    return {
      templateUrl: 'scripts/frame/navbar/navbar.html',
      controller: function($scope, Camera) {
        $scope.getPicture = Camera.getAndUploadPicture;
      }
    };
  });
})();
