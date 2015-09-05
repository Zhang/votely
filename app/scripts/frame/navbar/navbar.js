'use strict';

(function() {
  var app = angular.module('vote.navbar', []);
  app.directive('navbar', function(Camera) {
    return {
      templateUrl: 'scripts/frame/navbar/navbar.html',
      controller: function($scope) {
        $scope.getPicture = Camera.getPicture;
      }
    };
  });
})();
