'use strict';

const AWS = require('aws-sdk');

const AWS_CONFIG = {
  accessKeyId: 'AKIAIFOZRFNCM7Y5ZDZA',
  secretAccessKey: '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',
};

AWS.config.update(AWS_CONFIG);
const s3 = new AWS.S3();

/**
 * Upload a photo to S3.
 *
 * @param {stream.Readable} contents
 * @param {string} key to save file as
 * @return {Promise}
 */
const upload = function upload(contents, key) {
  const params = {
    Body: contents,
    Bucket: process.env.AWS_BUCKET,
    // Give the file a random name in S3
    Key: key
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
}

module.exports = {
  upload: upload
};
