'use strict';

(function() {
  angular.module('votelly', [
    'ionic',
    'ngCookies',
    'lib',
    'ui.router',
    'vote.cards',
    'vote.navbar',
    'vote.router',
    'vote.connections',
    'landingPage'
  ])

  .config(function($compileProvider, $httpProvider) {
     $httpProvider.defaults.withCredentials = true;
     $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })

  .run(function($ionicPlatform, $state, $rootScope, NavbarManager) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      //get account if session is present, else direct to login/signup
      $state.go('landingPage');
      $rootScope.$on(NavbarManager.EVENTS.pictureUploaded, function(res) {
        console.log(res);
      });
    });
  });
})();

