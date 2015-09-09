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

  yield accountModel.add({
    password: password,
    email: email
  });

  yield authentication.login.call(this, next);
};

/**
 * Exports.
 */

module.exports = create;
