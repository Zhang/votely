'use strict';

/**
 * Module dependencies.
 */

const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const photoController = require('./controllers/photo');
const mount = require('koa-mount');

/**
 * App instance.
 */

const app = koa();

/**
 * Global middleware.
 */

app.use(bodyParser());

/**
 * Routes.
 */

app.use(mount('/photo', require('./controllers/photo')));

/**
 * Exports.
 */

module.exports = app;
