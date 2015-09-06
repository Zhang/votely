'use strict';

const db = require('../db');
const collection = db.get('photos');

const add = function add(photo) {
  return collection.insert(photo)
}

module.exports = {
  add: add
};
