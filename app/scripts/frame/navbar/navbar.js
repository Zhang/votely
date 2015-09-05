'use strict';

(function() {
  var app = angular.module('vote.navbar', ['vote.api']);
  app.directive('navbar', function() {
    return {
      templateUrl: 'scripts/frame/navbar/navbar.html',
      controller: function($scope, Camera, Photo) {
        $scope.getPicture = function() {
          Camera.getPicture().then(function success(data) {
            $scope.data = JSON.stringify(data);
            Photo.save(data);
          });
        }
      }
    };
  });
})();
