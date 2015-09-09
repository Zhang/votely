'use strict';

/**
 * Module dependencies.
 */

const accountModel = require('../../models/account');
const authentication = require('../../lib/authentication');

/**
 * upload a photo. Handles multipart uploads only.
 */
const create = function* create(next) {
  const body = this.request.body;
  const email = body.username;
  const password = body.password;
  const self = this;

  yield accountModel.add({
    password: password,
    email: email
  });

  yield authentication.passport.authenticate('local', function* (err, user, info) {
    if (err) throw err;
    if (user === false) {
      self.status = 401;
      self.body = info;
    } else {
      self.status = 201;
      self.body = user;
      yield self.login(user);
    }
  }).call(this, next);
};

/**
 * Exports.
 */

module.exports = create;
