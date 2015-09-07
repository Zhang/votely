'use strict';

const photoModel = require('../../models/photos');
// FIXME: Replace this with a real photo store

const query = function* query(next) {
  this.body = yield photoModel.query();
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = query;
