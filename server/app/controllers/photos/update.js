'use strict';

const photoModel = require('../../models/photos');
const assert = require('assert');
const _ = require('lodash');

const update = function* update(next) {
  var body = this.request.body;
  console.log(body);
  assert(body && (body.upvote || body.downvote));

  this.body = yield photoModel.vote(this.params.id, body);
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = update;
