'use strict';

const accountModel = require('../../models/account');
const _ = require('lodash');

/**
 * Find a photo by ID.
 */
const query = function* query() {
  const body = this.request.body;
  const queryParams = {};

  if (body.getConnections) {
    queryParams.id = {$in: _.get(this, 'passport.user.connections')};
  }

  this.body = yield accountModel.query(queryParams);
  this.status = 200;
};

module.exports = query;
