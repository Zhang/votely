'use strict';

const photoModel = require('../../models/photos');

const query = function* query() {
  const body = this.request.body;
  var params = {};

  if (body.ids) {
    params.id = {$in: body.ids};
  }
  console.log(params);
  this.body = yield photoModel.query(params);
  this.status = 200;
};

module.exports = query;
