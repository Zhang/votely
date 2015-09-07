'use strict';

(function() {
  var app = angular.module('vote.managers.photos', ['config', 'ngResource']);
  app.config(['$resourceProvider', function($resourceProvider) {
    // Strips trailing slashes from urls
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }]);

  app.factory('PhotosManager', function($resource, ENV, $http) {
    var PHOTOS_ENDPOINT = ENV.apiEndpoint + 'photos/';

    function helpers() {
      this.upvote = function upvote(id) {
        return $http.post(PHOTOS_ENDPOINT + id, {
          upvote: true
        });
      }

      this.downvote = function upvote(id) {
        return $http.post(PHOTOS_ENDPOINT + id, {
          upvote: true
        });
      }

      this.query = function query() {
        var self = this;
        return $http.get(PHOTOS_ENDPOINT).then(function(res) {
          self.photos = res.data;
        });
      }

      this.upvote = function upvote(id) {
        return $http.post(PHOTOS_ENDPOINT + id, {
          upvote: true
        });
      }
    }

    function PhotosManager() {
      this.photos = [];
    };

    PhotosManager.prototype = new helpers();
    return PhotosManager
  });
})();

