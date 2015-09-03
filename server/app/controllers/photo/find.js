'use strict';

// FIXME: Replace this with a real photo store
const photos = {
  '123': {
    url: 'http://img1.wikia.nocookie.net/__cb20130318151721/epicrapbattlesofhistory/images/6/6d/Rick-astley.jpg'
  }
};

/**
 * Find a photo by ID.
 */
const find = function* find(id) {
  if (!photos.hasOwnProperty(id)) {
    this.status = 404;
    return;
  }

  this.body = photos[id];
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = find;
