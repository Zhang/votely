'use strict';

(function() {
  var app = angular.module('vote.cards', ['ionic.contrib.ui.tinderCards']);

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app.cards', {
      url: '/cards',
      views: {
        menuContent: {
          templateUrl: 'scripts/frame/cards/cards.html',
          controller: 'CardsController'
        }
      }
    })
  });

  app.controller('CardsController', function($scope, $stateParams) {
    $scope.cards = [
      { card: 1 },
      { card: 2 }
    ];

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
      var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
  })

  .controller('CardCtrl', function($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function(index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    };
    $scope.cardSwipedRight = function(index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
  });
})();
