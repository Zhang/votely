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

const get = function get(id) {
  return collection.findById(id);
}

const add = function add(photo) {
  photo = _.defaults(photo, {
    upvote: 0,
    downvote: 0
  });

  var validity = Joi.validate(photo, PhotoSchema);

  if (validity.error) {
    console.log('Invalid photo object: ', JSON.stringify(photo));
    console.log('Error: ', validity.error);
    return validity.error;
  }

  return collection.insert(photo);
}

const vote = function* vote(id, voteResult) {
  const photo = yield get(id);
  let increment;

  if (voteResult.upvote) {
    increment = { upvote: photo.upvote += 1 };
  } else {
    increment = { downvote: photo.downvote += 1 };
  }

  return collection.update(id, {$set: increment});
}

const query = function query() {
  return collection.find({});
}

module.exports = {
  add: add,
  query: query,
  vote: vote,
  get: get
};
