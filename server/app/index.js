'use strict';

/**
 * Module dependencies.
 */

const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const mount = require('koa-mount');
const logger = require('koa-logger');
const cors = require('kcors');

/**
 * App instance.
 */

const app = koa();

/**
 * Global middleware.
 */

app.use(bodyParser({
  formLimit: '10mb'
}));
app.use(logger());
app.use(cors());

/**
 * Routes.
 */
app.use(mount('/photos', require('./controllers/photos')));

/**
 * Exports.
 */

module.exports = app;
