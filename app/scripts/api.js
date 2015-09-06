'use strict';

(function() {
  var app = angular.module('vote.api', ['config', 'ngResource']);
  app.config(['$resourceProvider', function($resourceProvider) {
    // Strips trailing slashes from urls
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }]);

  app.factory('Photo', function($resource, ENV, $http) {
    function formDataObject (data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
          fd.append(key, value);
      });
      return fd;
    }
    return {
      save: function(data) {
        var formatedData = formDataObject(data);
        return $http.post(ENV.apiEndpoint + 'photo', formatedData);
      }
    }
    // return $resource(ENV.apiEndpoint + 'photo/:id', {id: '@id'}, {
    //   save: {
    //     method: 'POST',
    //     transformRequest: formDataObject,
    //     headers: {'Content-Type': undefined, enctype:'multipart/form-data'}
    //   }
    // });
  })
})();

