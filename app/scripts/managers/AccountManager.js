'use strict';

(function() {
  var app = angular.module('vote.managers.account', ['config', 'ngResource']);
  app.factory('AccountManager', function(ENV, $http) {
    var ACCOUNT_ENDPOINT = ENV.apiEndpoint + 'accounts/';

    var AccountManager = {
      signup: function upvote(email, password) {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT, {
          username: email,
          password: password
        }).then(function(res) {
          self.currentUser = res.data;
        });
      },
      getFriends: function() {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT + 'query/', {
          ids: self.currentUser.connections
        }).then(function(res) {
          return res.data;
        });
      },
      connect: function(connectWith) {
        return $http.post(ACCOUNT_ENDPOINT + 'connect/' + connectWith);
      },
      currentUser: {}
    };

    return AccountManager;
  });
})();

