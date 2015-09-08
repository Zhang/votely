'use strict';

const monk = require('monk');
const async = require('async');
const _ = require('lodash');
const semver = require('semver');
const util = require('util');

function validateMongoVersion(db, cb) {
  const EXPECTED_MONGO_VERSION = '3.0.x';

  async.waterfall([
    function(cb) {
      db.admin().buildInfo(cb);
    },

    function(buildInfo, cb) {
      const version = buildInfo.version;
      if (!semver.satisfies(version, EXPECTED_MONGO_VERSION)) {
        return cb(new Error(util.format(
          'Mongo version is %s, but Votally requires version %s. Exiting...',
          version, EXPECTED_MONGO_VERSION
        )));
      }

      cb();
    }
  ], cb);
}

module.exports = (function() {
  const db = monk('localhost/votelly', {
    w: 1,
    j: true,
    native_parser: true,
    poolSize: 25
  });

  async.series(_.compact([
    _.partial(validateMongoVersion, db.driver),
  ]), function(err) {
    if (err) {
      console.log('Failed to load db');
      console.log(err);
    }
  });

  return db;
})();
