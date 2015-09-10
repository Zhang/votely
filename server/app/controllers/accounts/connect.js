'use strict';

const accountModel = require('../../models/account');
const _ = require('lodash');
const errors = require('../../lib/errors');

/**
 * Find a photo by ID.
 */
const connect = function* find() {
  const requester = _.get(this, 'passport.user.id');
  const connectionEmail = this.params.email;
  const connection = yield accountModel.getByEmail(connectionEmail);
  if (!connection) {
    throw new errors.NotFoundError('account', connectionEmail);
  } else {
    yield accountModel.connect(requester, connection.id);

    this.status = 200;
  }
};

/**
 * Exports.
 */

module.exports = connect;
