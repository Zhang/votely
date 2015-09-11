'use strict';

const _ = require('lodash');

/**
 * Find a photo by ID.
 */
const current = function* find(next) {
  const requester = _.get(this, 'passport.user');
  this.body = requester || null;
  this.status = 200;
  yield next;
};

/**
 * Exports.
 */

module.exports = current;
