'use strict';

(function() {
  angular.module('votelly', [
    'ionic',
    'lib',
    'ui.router',
    'vote.cards',
    'vote.navbar',
    'vote.router',
    'landingPage'
  ])

  .config(function($compileProvider) {
     $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  })

  .run(function($ionicPlatform, $state) {
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
    });
  })
  .service('account', function(AccountManager) {
    var accountManager = new AccountManager();
    return accountManager;
  });
})();

