'use strict';

const accountModel = require('../../models/account');
const _ = require('lodash');
/**
 * Find a photo by ID.
 */
const connect = function* find() {
  const requester = _.get(this, 'passport.user._id');
  const connection = this.params.id;
  yield accountModel.connect(requester, connection);

  this.status = 200;
};

/**
 * Exports.
 */

module.exports = connect;
