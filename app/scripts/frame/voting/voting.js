'use strict';

(function() {
  var app = angular.module('vote.cards', ['ionic.contrib.ui.tinderCards', 'vote.managers.photos', 'vote.managers.navbar']);

  app.config(function($stateProvider, STATE) {
    $stateProvider

    .state(STATE.voting, {
      cache: false,
      url: '/voting/:connectionId',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/voting/voting.html',
          controller: 'VotingController'
        }
      },
      resolve: {
        Photos: function(AccountManager, $stateParams) {
          AccountManager.getReceivedPhotos($stateParams.connectionId);
        }
      }
    });
  });

  app.controller('VotingController', function($scope, $stateParams, Photos, PhotosManager, NavbarManager) {
    NavbarManager.useCamera();
    $scope.cards = Photos;
    var photosManager = new PhotosManager();

    $scope.cardSwipedLeft = function(card) {
      photosManager.upvote(card.id);
    };

    $scope.cardSwipedRight = function(card) {
      photosManager.downvote(card.id);
    };
  });
})();
