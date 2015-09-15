'use strict';

(function() {
  var app = angular.module('vote.managers.account', ['config']);
  app.factory('AccountManager', function(ENV, $http, $ionicPopup, PhotosManager, $state, STATE) {
    var ACCOUNT_ENDPOINT = ENV.apiEndpoint + 'accounts/';

    function sendCredentials(route, credentials, context) {
      return $http.post(route, credentials).then(function(res) {
        context.currentUser = res.data;
      });
    }
    var AccountManager = {
      getCurrentAccount: function getCurrentUser() {
        var self = this;
        return $http.get(ACCOUNT_ENDPOINT + 'current').then(function(res) {
          self.currentUser = res.data;
        });
      },
      logout: function logout() {
        return $http.post(ENV.apiEndpoint + 'logout').then(function() {
          $state.go(STATE.landingPage);
        });
      },
      login: function login(email, password) {
        return sendCredentials(ENV.apiEndpoint + 'login/', {
          username: email,
          password: password
        }, this);
      },
      signup: function signup(email, password, screenname) {
        return sendCredentials(ACCOUNT_ENDPOINT, {
          username: email,
          password: password,
          screenname: screenname
        }, this);
      },
      getConnections: function getConnections() {
        return $http.post(ACCOUNT_ENDPOINT + 'query/', {
          getConnections: true
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
      getReceivedPhotos: function(from) {
        var photosManager = new PhotosManager();
        var receivedPhotos = this.currentUser.receivedPhotos;
        if (from) {
          receivedPhotos = _.filter(receivedPhotos, {from : from});
        }
        return photosManager.query({ids: _.map(receivedPhotos, 'id')}).then(function() {
          return photosManager;
        });
      },
      getSelfPhotos: function() {
        var photosManager = new PhotosManager();
        return photosManager.query({ids: this.currentUser.selfPhotos}).then(function() {
          return photosManager;
        });
      },
      currentUser: {}
    };

    return AccountManager;
  });
})();

