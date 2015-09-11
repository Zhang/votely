'use strict';

const Joi = require('joi');
const uuid = require('uuid');
const _ = require('lodash');

module.exports = function(collectionName, collection, schema) {
  return {
    create: function create(toAdd) {
      toAdd.id = toAdd.id || uuid.v4();

      var validity = Joi.validate(toAdd, schema);

      if (validity.error) {
        console.log('Invalid ' + collectionName + ' object: ', JSON.stringify(toAdd));
        console.log('Error: ', validity.error);
        throw validity.error;
      }

      return collection.insert(toAdd);
    },
    get: function get(id) {
      return collection.findOne({id: id});
    },
    bulkUpdate: function bulkUpdate(ids, updateParams) {
      return collection.update({id: {$in: ids}}, updateParams, {multi: true});
    },
    updateById: function updateById(id, updateParams) {
      return this.bulkUpdate([id], updateParams);
    },
    query: function query(params) {
      params = params || {};
      const optKeys = ['sort', 'limit', 'offset'];
      const opts = _.pick(params, optKeys);
      const filter = _.omit(params, optKeys);

      const q = collection.find(filter);

      if (opts.limit) {
        q.limit(opts.limit);
      }

      return q;
    }
  };
};
