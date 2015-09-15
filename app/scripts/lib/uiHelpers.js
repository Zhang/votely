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
  app.directive('backImg', function() {
    return {
      restrict: 'A',
      link: function(s, el, attrs) {
        //Extremely not secure
        var url = attrs.backImg;
        el.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover',
            'background-position': 'center'
        });
      }
    };
  });
})();
