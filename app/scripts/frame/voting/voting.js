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
    NavbarManager.useCamera();
    $scope.photos = photosManager.photos;

    $scope.cardSwipedLeft = function(card) {
      photosManager.upvote(card.id);
    };

    $scope.cardSwipedRight = function(card) {
      photosManager.downvote(card.id);
    };
  });
})();
