'use strict';

const accountModel = require('../../models/account');
/**
 * Find a photo by ID.
 */
const share = function* share() {
  const body = this.request.body;

  const updated = yield accountModel.bulkUpdate(body.accounts, {$push: {receivedPhotos: {
    id: this.params.id,
    from: this.passport.user.id
  }}});

  this.body = updated;
  this.status = 200;
};

/**
 * Exports.
 */

module.exports = share;
