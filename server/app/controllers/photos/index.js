'use strict';

const app = require('koa')();
const router = require('koa-router')();
const bodyParser = require('koa-body-parser');

app.use(bodyParser({
  formLimit: '10mb'
}));

router.post('/', require('./create'));
router.post('/:id', require('./update'));
router.get('/:id', require('./find'));
router.get('/', require('./query'));

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
