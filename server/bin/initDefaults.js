'use strict';

const accountModel = require('../app/models/account');
const photosModel = require('../app/models/photos');

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
  selfPhotos: [GPIG_1.id, GPIG_2.id]
};
(function* () {
  //fix this up
  console.log('hmmm');
  yield accountModel.add(SYSTEM_ACCOUNT);
  yield photosModel.add(GPIG_1);
  yield photosModel.add(GPIG_2);
  process.exit(0);
})();

