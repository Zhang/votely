'use strict';

(function() {
  var app = angular.module('vote.cards', ['vote.managers.photos', 'vote.managers.navbar', 'lib.uiHelpers']);

  app.config(function($stateProvider, STATE) {
    $stateProvider

    .state(STATE.voting, {
      cache: false,
      url: '/voting/:connection',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/voting/voting.html',
          controller: 'VotingController'
        }
      },
      resolve: {
        photosManager: function(AccountManager, $stateParams) {
          return AccountManager.getReceivedPhotos($stateParams.connection);
        }
      }
    });
  });

  app.controller('VotingController', function($scope, $stateParams, photosManager, NavbarManager) {
    NavbarManager.useVoting();
    $scope.photos = photosManager.photos;

    $scope.upvote = function(photo) {
      photosManager.upvote(photo.id);
    };

    $scope.downvote = function(photo) {
      photosManager.downvote(photo.id);
    };
  });
})();
