'use strict';

/**
 * Module dependencies.
 */

const accountModel = require('../../models/account');
const authentication = require('../../lib/authentication');

/**
 * upload a photo. Handles multipart uploads only.
 */
const create = function* create() {
  const body = this.request.body;
  const email = body.username;
  const password = body.password;
  const screenname = body.screenname;

  yield accountModel.add({
    password: password,
    email: email,
    screenname: screenname
  });

  yield authentication.login.call(this);
};

/**
 * Exports.
 */

module.exports = create;
