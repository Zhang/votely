'use strict';

(function() {
  var app = angular.module('lib.uiHelpers', []);
  app.directive('toggleClass', function() {
      return {
          restrict: 'A',
          link: function(s, el, attrs) {
              el.bind('click', function() {
                  el.toggleClass(attrs.toggleClass);
              });
          }
      };
  });
})();
