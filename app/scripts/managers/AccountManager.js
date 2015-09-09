'use strict';

(function() {
  var app = angular.module('vote.managers.account', ['config', 'ngResource']);
  app.factory('AccountManager', function(ENV, $http) {
    var ACCOUNT_ENDPOINT = ENV.apiEndpoint + 'accounts/';

    function Helpers() {
      this.signup = function upvote(email, password) {
        var self = this;
        return $http.post(ACCOUNT_ENDPOINT, {
          username: email,
          password: password
        }).then(function(res) {
          //var token = res.payload.token;
          //$http.defaults.headers.common['X-Access-Token'] = token;
          //$cordovaLocalStorage.setItem('sessionToken', token);
          self.currentUser = res.data;
        });
      };
    }

    function AccountManager() {
      this.currentUser = {};
    }

    AccountManager.prototype = new Helpers();
    return AccountManager;
  });
})();

