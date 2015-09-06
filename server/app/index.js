'use strict';

/**
 * Module dependencies.
 */

const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const photoController = require('./controllers/photo');
const mount = require('koa-mount');
const logger = require('koa-logger')
const cors = require('kcors');

/**
 * App instance.
 */

const app = koa();

/**
 * Global middleware.
 */

app.use(logger());
app.use(cors());
app.use(bodyParser({
  limit: '10mb'
}));

/**
 * Routes.
 */

app.use(mount('/photo', require('./controllers/photo')));

/**
 * Exports.
 */

module.exports = app;
