'use strict';

const photoModel = require('../../models/photos');

const query = function* query() {
  this.body = yield photoModel.query();
  this.status = 200;
};

module.exports = query;
