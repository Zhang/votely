'use strict';

const accountModel = require('../../models/account');
/**
 * Find a photo by ID.
 */
const query = function* query() {
  const body = this.request.body;
  const queryParams = {};

  if (body.ids) {
    queryParams.id = {$in: body.ids};
  }

  this.body = yield accountModel.query(queryParams);
  this.status = 200;
};

module.exports = query;
