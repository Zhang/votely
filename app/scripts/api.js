'use strict';

(function() {
  var app = angular.module('vote.api', ['config', 'ngResource']);
  app.config(['$resourceProvider', function($resourceProvider) {
    // Strips trailing slashes from urls
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }]);

  app.factory('Photos', function($resource, ENV, $http) {
    return {
      upvote: function(id) {
        return $http.post(ENV.apiEndpoint + 'photos/' + id, {
          upvote: true
        });
      },
      upvote: function(id) {
        return $http.post(ENV.apiEndpoint + 'photos/' + id, {
          downvote: true
        });
      },
      query: function(params) {
        return $http.get(ENV.apiEndpoint + 'photos');
      }
    }
  });
})();

