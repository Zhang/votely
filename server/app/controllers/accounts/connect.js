'use strict';

const accountModel = require('../../models/account');
const _ = require('lodash');
/**
 * Find a photo by ID.
 */
const connect = function* find() {
  const requester = _.get(this, 'passport.user._id');
  const connectionEmail = this.params.email;
  const connection = yield accountModel.getByEmail(connectionEmail);
  yield accountModel.connect(requester, connection._id);

  this.status = 200;
};

/**
 * Exports.
 */

module.exports = connect;
