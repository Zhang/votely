'use strict';

(function() {
  var app = angular.module('vote.cards', ['ionic.contrib.ui.tinderCards', 'vote.managers.photos']);

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
          return photosManager.query().then(function() {
            return photosManager;
          });
        }
      }
    });
  });

  app.controller('CardsController', function($scope, $stateParams, photosManager) {
    $scope.cards = photosManager.photos;

    function addCard() {}

    $scope.cardSwipedLeft = function(card) {
      photosManager.upvote(card._id).then(function() {
        addCard();
      });
    };

    $scope.cardSwipedRight = function(card) {
      photosManager.downvote(card._id).then(function() {
        addCard();
      });
    };
  });
})();
