'use strict';

(function() {
  var app = angular.module('vote.managers.account', ['config', 'ngResource']);
  app.factory('AccountManager', function(ENV, $http, $ionicPopup) {
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
      getConnections: function() {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT + 'query/', {
          ids: self.currentUser.connections
        }).then(function(res) {
          return res.data;
        });
      },
      connect: function(connectWith) {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT + 'connect/' + connectWith).then(function resolve() {
          $http.get(ACCOUNT_ENDPOINT + self.currentUser._id).then(function(res) {
            self.currentUser = res.data;
          });
        },
        function reject() {
          $ionicPopup.alert({
            title: 'Invalid Email',
            template: 'We cant find anyone by that email address, can you try again?'
          });
        });
      },
      currentUser: {}
    };

    return AccountManager;
  });
})();

