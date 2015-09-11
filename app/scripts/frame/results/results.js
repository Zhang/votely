'use strict';

(function() {
  var app = angular.module('vote.results', []);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.results', {
      cache: false,
      url: '/results',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/results/results.html',
          controller: 'ResultsController'
        }
      },
      resolve: {
        photosManager: function(PhotosManager, AccountManager) {
          return AccountManager.getSelfPhotos();
        }
      }
    });
  });

  app.controller('ResultsController', function($scope, photosManager, NavbarManager) {
    NavbarManager.useCamera();
    $scope.photos = photosManager.photos;
  });
})();
