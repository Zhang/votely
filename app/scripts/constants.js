'use strict';

(function() {
  var app = angular.module('constants', []);
  app.constant('STATE', {
    app: 'app',
    connections: 'app.connections',
    voting: 'app.voting',
    landingPage: 'landingPage',
    signup: 'signup',
    share: 'app.share',
    results: 'app.results'
  });
})();
