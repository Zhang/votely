'use strict';

const photoModel = require('../../models/photos');

const query = function* query() {
  const body = this.request.body;
  this.body = yield photoModel.query(body);
  this.status = 200;
};

module.exports = query;
