'use strict';

(function() {
  var app = angular.module('vote.cards', ['ionic.contrib.ui.tinderCards', 'vote.managers.photos', 'vote.managers.navbar']);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.cards', {
      cache: false,
      url: '/cards',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/cards/cards.html',
          controller: 'CardsController'
        }
      },
      resolve: {
        Photos: function(PhotosManager, AccountManager) {
          AccountManager.getReceivedPhotos();
        }
      }
    });
  });

  app.controller('CardsController', function($scope, $stateParams, Photos, PhotosManager, NavbarManager) {
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
