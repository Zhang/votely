'use strict';

const db = require('../db');
const collection = db.get('photos');
const Joi = require('joi');
const _ = require('lodash');

const PhotoSchema = Joi.object().keys({
  _id: Joi.string(),
  upvote: Joi.number().required(),
  downvote: Joi.number().required(),
  key: Joi.string().required(),
  location: Joi.string().required()
});

const modelCRUD = require('./concerns/modelCRUD')('photos', collection, PhotoSchema);

const add = function add(photo) {
  photo = _.defaults(photo, {
    upvote: 0,
    downvote: 0
  });
  modelCRUD.create(photo);
};

const vote = function* vote(id, voteResult) {
  const photo = yield modelCRUD.get(id);
  let increment;

  if (voteResult.upvote) {
    increment = { upvote: photo.upvote += 1 };
  } else {
    increment = { downvote: photo.downvote += 1 };
  }

  return collection.update(id, {$set: increment});
};

module.exports = {
  add: add,
  query: modelCRUD.query,
  vote: vote,
  get: modelCRUD.get
};
