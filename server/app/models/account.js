'use strict';

const db = require('../db');
const collection = db.get('account');
const Joi = require('joi');
const errors = require('../lib/errors');
const _ = require('lodash');

const PhotoSchema = Joi.string().description('strings corresponding to the id of photos');
const AccountSchema = Joi.object().keys({
  _id: Joi.string(),
  id: Joi.string().required(),
  email: Joi.string().required(),
  screenname: Joi.string().required(),
  password: Joi.string().required(),
  connections: Joi.array().items(Joi.string().description('strings corresponding to the id of other users')).required(),
  selfPhotos: Joi.array().items(PhotoSchema).required(),
  receivedPhotos: Joi.array().items(Joi.object().keys({
    id: PhotoSchema,
    from: Joi.string().required().description('account id of person who shared this photo')
  })).required()
});

function addSystemValues(account) {
  const DEFAULT_ID = 'I love guinea pigs';

  account.connections = account.connections.concat(DEFAULT_ID);
  account.receivedPhotos = account.receivedPhotos.concat([{
    id: 'gpig1',
    from: DEFAULT_ID
  }, {
    id: 'gpig2',
    from: DEFAULT_ID
  }]);

  return account;
}

const modelCRUD = require('./concerns/modelCRUD')('account', collection, AccountSchema);

function getByEmail(email) {
  return collection.findOne({email: email});
}

function getByScreenname(screenname) {
  return collection.findOne({screenname: screenname});
}

function* add(account) {
  _.defaults(account, {
    connections: [],
    selfPhotos: [],
    receivedPhotos: []
  });

  const withSysValues = addSystemValues(account);

  const existingAccount = yield getByEmail(withSysValues.email);
  if (existingAccount) throw new errors.DuplicateError('account', withSysValues.email);
  yield modelCRUD.create(withSysValues);
}

function* connect(requester, connection) {
  yield modelCRUD.updateById(requester, {$push: {connections: connection}});
  yield modelCRUD.updateById(connection, {$push: {connections: requester}});
}

function* associatePhoto(accountId, photoId) {
  yield modelCRUD.updateById(accountId, {$push: {selfPhotos: photoId}});
}

module.exports = {
  add: add,
  get: modelCRUD.get,
  query: modelCRUD.query,
  getByEmail: getByEmail,
  connect: connect,
  bulkUpdate: modelCRUD.bulkUpdate,
  associatePhoto: associatePhoto,
  getByScreenname: getByScreenname
};
