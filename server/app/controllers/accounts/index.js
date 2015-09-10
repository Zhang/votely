'use strict';

const app = require('koa')();
const router = require('koa-router')();

router.post('/', require('./create'));
router.post('/query', require('./query'));
router.get('/:id', require('./get'));
router.post('/connect/:email', require('./connect'));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
