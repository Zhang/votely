'use strict';

(function() {
  var app = angular.module('vote.cards', ['ionic.contrib.ui.tinderCards', 'vote.managers.photos', 'vote.managers.navbar']);

  app.config(function($stateProvider) {
    $stateProvider

    .state('app.cards', {
      url: '/cards',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/cards/cards.html',
          controller: 'CardsController'
        }
      },
      resolve: {
        photosManager: function(PhotosManager) {
          var photosManager = new PhotosManager();
          return photosManager.query({limit: 5}).then(function() {
            return photosManager;
          });
        }
      }
    });
  });

  app.controller('CardsController', function($scope, $stateParams, photosManager, NavbarManager) {
    NavbarManager.useCamera();
    $scope.cards = photosManager.photos;

    function addCard() {}

    $scope.cardSwipedLeft = function(card) {
      photosManager.upvote(card.id).then(function() {
        addCard();
      });
    };

    $scope.cardSwipedRight = function(card) {
      photosManager.downvote(card.id).then(function() {
        addCard();
      });
    };
  });
})();
