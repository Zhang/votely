'use strict';

const app = require('koa')();
const router = require('koa-router')();

router.post('/', require('./create'));
router.post('/query', require('./query'));
router.post('/:id/share', require('./share'));
router.post('/:id', require('./update'));
router.get('/:id', require('./get'));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
