'use strict';

/**
 * Module dependencies.
 */

const accountModel = require('../../models/account');

/**
 * upload a photo. Handles multipart uploads only.
 */
const create = function* create(next) {
  const body = this.request.body;
  const email = body.email;
  const password = body.password;

  yield accountModel.add({
    password: password,
    email: email
  });

  // TODO: Don't accept blindly
  this.status = 202;
};

/**
 * Exports.
 */

module.exports = create;
