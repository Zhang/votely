'use strict';

/**
 * Find a photo by ID.
 */
const find = function* find(next) {
  const id = this.params.id;
  if (!photos.hasOwnProperty(id)) {
    this.status = 404;
    return;
  }

  this.body = yield photoModel.get(id);
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = find;
