'use strict';

/**
 * Module dependencies.
 */

const parse = require('co-busboy');
const uploadPhoto = require('../../lib/aws').upload;
const extension = require('mime-types').extension;
const photoModel = require('../../models/photos');
const uuid = require('uuid');

/**
 * upload a photo. Handles multipart uploads only.
 */
const create = function* create(next) {
  if (!this.request.is('multipart/*')) {
    return yield next;
  }

  // TODO: Create a list of permissible file types and verify filename against
  // it
  const parts = yield parse(this);
  const ext = extension(parts.mimeType);
  const key = `${uuid.v4()}.${ext}`;

  const upload = yield uploadPhoto(parts, key);
  yield photoModel.add({
    location: upload.Location,
    key: key
  });

  // TODO: Don't accept blindly
  this.status = 202;
};

/**
 * Exports.
 */

module.exports = create;
