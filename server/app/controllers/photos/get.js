'use strict';

const photoModel = require('../../models/photos');
/**
 * Find a photo by ID.
 */
const find = function* find(next) {
  const id = this.params.id;
  const photo = yield photoModel.get(id);
  if (!photo) {
    this.status = 404;
    return;
  }

  this.body = photo;
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = find;
