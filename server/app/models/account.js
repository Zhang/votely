'use strict';

const db = require('../db');
const collection = db.get('account');
const Joi = require('joi');
const errors = require('../lib/errors');

const PhotoSchema = Joi.string().description('strings corresponding to the id of photos');
const AccountSchema = Joi.object().keys({
  _id: Joi.string(),
  id: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  connections: Joi.array().items(Joi.string().description('strings corresponding to the id of other users')).required(),
  selfPhotos: Joi.array().items(PhotoSchema).required(),
  receivedPhotos: Joi.array().items(Joi.object().keys({
    id: PhotoSchema,
    from: Joi.string().required()
  })).required()
});

const modelCRUD = require('./concerns/modelCRUD')('account', collection, AccountSchema);

function getByEmail(email) {
  return collection.findOne({email: email});
}

function* add(account) {
  _.defaults(account, {
    connections: [],
    selfPhotos: [],
    receivedPhotos: []
  });

  const existingAccount = yield getByEmail(account.email);
  if (existingAccount) throw new errors.DuplicateError('account', account.email);
  yield modelCRUD.create(account);
}

function* connect(requester, connection) {
  yield modelCRUD.updateById(requester, {$push: {connections: connection}});
  yield modelCRUD.updateById(connection, {$push: {connections: requester}});
}

module.exports = {
  add: add,
  get: modelCRUD.get,
  query: modelCRUD.query,
  getByEmail: getByEmail,
  connect: connect,
  bulkUpdate: modelCRUD.bulkUpdate
};
