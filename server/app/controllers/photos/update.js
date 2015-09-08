'use strict';

const photoModel = require('../../models/photos');
const assert = require('assert');

const update = function* update(next) {
  const body = this.request.body;
  assert(body && (body.upvote || body.downvote));

  this.body = yield photoModel.vote(this.params.id, body);
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = update;
