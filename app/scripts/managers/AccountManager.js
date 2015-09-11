'use strict';

(function() {
  var app = angular.module('vote.managers.account', ['config']);
  app.factory('AccountManager', function(ENV, $http, $ionicPopup, PhotosManager) {
    var ACCOUNT_ENDPOINT = ENV.apiEndpoint + 'accounts/';

    function sendCredentials(route, credentials, context) {
      return $http.post(route, credentials).then(function(res) {
        context.currentUser = res.data;
      });
    }
    var AccountManager = {
      login: function login(email, password) {
        return sendCredentials(ENV.apiEndpoint + 'login/', {
          username: email,
          password: password
        }, this);
      },
      signup: function signup(email, password) {
        return sendCredentials(ACCOUNT_ENDPOINT, {
          username: email,
          password: password
        }, this);
      },
      getConnections: function getConnections() {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT + 'query/', {
          ids: self.currentUser.connections
        }).then(function(res) {
          return res.data;
        });
      },
      connect: function connect(connectWith) {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT + 'connect/' + connectWith).then(function resolve() {
          $http.get(ACCOUNT_ENDPOINT + self.currentUser.id).then(function(res) {
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
      getReceivedPhotos: function() {
        var photosManager = new PhotosManager();
        return photosManager.query({ids: _.map(this.currentUser.receivedPhotos, 'id')})
      },
      currentUser: {}
    };

    return AccountManager;
  });
})();

