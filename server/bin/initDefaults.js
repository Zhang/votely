'use strict';

const accountModel = require('../app/models/account');
const photosModel = require('../app/models/photos');
const db = require('../app/db');
const collection = db.get('account');
const GPIG_1 = {
  id: 'gpig1',
  location: 'https://www.omlet.de/images/cache/800/600/guinea_pigs_guide_bay_-_the_chubby_piggie.jpg',
  key: 'internet'
};
const GPIG_2 = {
  id: 'gpig2',
  location: 'https://i.imgur.com/RRZRzI8.jpg',
  key: 'internet'
};
const SYSTEM_ACCOUNT = {
  id: 'I love guinea pigs',
  email: 'scottzhang235@gmail.com',
  password: 'gpig',
  selfPhotos: [GPIG_1.id, GPIG_2.id],
  connections: [],
  receivedPhotos: []
};

collection.insert(SYSTEM_ACCOUNT);
