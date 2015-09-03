'use strict';

//(function() {
  var app = angular.module('vote.navbar', []);
  app.directive('navbar', function() {
    return {
      templateUrl: 'app/navbar/navbar.html'
    };
  });
//})();
