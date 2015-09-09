'use strict';

const db = require('../db');
const collection = db.get('account');
const Joi = require('joi');

const AccountSchema = Joi.object().keys({
  _id: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

const modelCRUD = require('./concerns/modelCRUD')('account', collection, AccountSchema);

function getByEmail(email) {
  return collection.findOne({email: email});
}

module.exports = {
  add: modelCRUD.create,
  get: modelCRUD.get,
  getByEmail: getByEmail
};
