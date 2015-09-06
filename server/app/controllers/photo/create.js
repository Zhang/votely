'use strict';

/**
 * Module dependencies.
 */

const S3 = require('aws-sdk').S3;
const extension = require('mime-types').extension;
const parse = require('co-busboy');
const uuid = require('uuid');

/**
 * Upload a photo to S3.
 *
 * @param {string} mimeType
 * @param {stream.Readable} contents
 * @return {Promise}
 */
const uploadPhoto = function uploadPhoto(mimeType, contents) {
  const s3 = new S3();
  // FIXME: This will return false if the mime type is not found, handle that
  // case
  const ext = extension(mimeType);
  const params = {
    Body: contents,
    Bucket: process.env.AWS_BUCKET,
    // Give the file a random name in S3
    Key: `${uuid.v4()}.${ext}`
  };

  return new Promise(function(resolve, reject) {
    s3.upload(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

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
  yield uploadPhoto(parts.mimeType, parts);

  // TODO: Don't accept blindly
  this.status = 202;
};

/**
 * Exports.
 */

module.exports = create;
