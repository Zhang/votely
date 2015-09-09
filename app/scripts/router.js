'use strict';

(function() {
  var app = angular.module('vote.router', []);
  app.config(function($stateProvider) {
    $stateProvider.state('app', {
      url: '',
      abstract: true,
      templateUrl: 'scripts/frame/sidebar.html'
    });
  });
})();
