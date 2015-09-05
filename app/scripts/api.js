'use strict';

(function() {
  var app = angular.module('vote.api', ['config', 'ngResource']);
  app.config(['$resourceProvider', function($resourceProvider) {
    // Strips trailing slashes from urls
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }]);

  app.factory('Photo', function($resource, ENV) {
    function formDataObject (data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
          fd.append(key, value);
      });
      return fd;
    }

    return $resource(ENV.apiEnpoint + 'photo/:id', {id: '@id'}, {
      save: {
        method: 'POST',
        transformRequest: formDataObject,
        headers: {'Content-Type': undefined, enctype:'multipart/form-data'}
      }
    });
  })
})();

