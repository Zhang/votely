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

function* add(account) {
  const existingAccount = yield getByEmail(account.email);
  if (existingAccount) throw new Error('an account with this email already exists!');
  yield modelCRUD.create(account);
}

module.exports = {
  add: add,
  get: modelCRUD.get,
  getByEmail: getByEmail
};
