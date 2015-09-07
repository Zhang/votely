'use strict';

(function() {
  var app = angular.module('vote.cards', ['ionic.contrib.ui.tinderCards', 'vote.api']);

  app.config(function($stateProvider, $urlRouterProvider) {
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
        Photos: function(Photos) {
          return Photos.query();
        }
      }
    })
  });

  app.controller('CardsController', function($scope, $stateParams, Photo, Photos) {
    $scope.cards = [
      { card: 1 },
      { card: 2 }
    ];

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = {
        card: Math.random()
      };
      $scope.cards.push(newCard);
    }

    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      Photo.upvote().then
      $scope.addCard();
    };
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
  });
})();
