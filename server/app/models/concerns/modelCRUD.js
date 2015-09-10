'use strict';

const Joi = require('joi');
const uuid = require('uuid');

module.exports = function(collectionName, collection, schema) {
  return {
    create: function(toAdd) {
      toAdd.id = toAdd.id || uuid.v4();

      var validity = Joi.validate(toAdd, schema);

      if (validity.error) {
        console.log('Invalid ' + collectionName + ' object: ', JSON.stringify(toAdd));
        console.log('Error: ', validity.error);
        throw validity.error;
      }

      return collection.insert(toAdd);
    },
    get: function(id) {
      return collection.findOne({id: id});
    },
    updateById: function(id, updateParams) {
      return collection.update({id: id}, updateParams);
    },
    query: function(params) {
      params = params || {};
      const q = collection.find(params);

      if (params.limit) {
        q.limit(params.limit);
      }

      return q;
    }
  };
};
