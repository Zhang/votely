'use strict';

const app = require('koa')();
const router = require('koa-router')();

router.post('/', require('./create'));
router.post('/query', require('./query'));
router.post('/connect/:email', require('./connect'));
router.get('/current', require('./current'));
router.get('/:id', require('./get'));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
