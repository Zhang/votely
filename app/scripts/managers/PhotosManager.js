'use strict';

(function() {
  var app = angular.module('vote.managers.photos', ['config']);
  app.factory('PhotosManager', function(ENV, $http) {
    var PHOTOS_ENDPOINT = ENV.apiEndpoint + 'photos/';

    function Helpers() {
      this.upvote = function upvote(id) {
        return $http.post(PHOTOS_ENDPOINT + id, {
          upvote: true
        });
      };

      this.downvote = function upvote(id) {
        return $http.post(PHOTOS_ENDPOINT + id, {
          upvote: true
        });
      };

      this.query = function query(params) {
        var self = this;
        return $http.post(PHOTOS_ENDPOINT + 'query', params || {}).then(function(res) {
          self.photos = res.data;
        });
      };

      this.share = function share(id, accounts) {
        return $http.post(PHOTOS_ENDPOINT + id + '/share', {accounts: accounts});
      };
    }

    function PhotosManager() {
      this.photos = [];
    }

    PhotosManager.prototype = new Helpers();
    return PhotosManager;
  });
})();
