'use strict';

const db = require('../db');
const collection = db.get('account');
const Joi = require('joi');

const AccountSchema = Joi.object().keys({
  _id: Joi.string(),
  email: Joi.number().required(),
  password: Joi.number().required()
});

const modelCRUD = require('./concerns/modelCRUD')('photos', collection, AccountSchema);

module.exports = {
  add: modelCRUD.create,
  get: modelCRUD.get
};
