'use strict';

const Joi = require('joi');

module.exports = function(collectionName, collection, schema) {
  return {
    create: function(toAdd) {

      var validity = Joi.validate(toAdd, schema);

      if (validity.error) {
        console.log('Invalid ' + collectionName + ' object: ', JSON.stringify(toAdd));
        console.log('Error: ', validity.error);
        return validity.error;
      }

      return collection.insert(toAdd);
    },
    get: function(id) {
      return collection.findById(id);
    },
    query: function() {
      return collection.find({});
    }
  };
};
