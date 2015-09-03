'use strict';

/**
 * Module dependencies.
 */

const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const photoController = require('./controllers/photo');
const route = require('koa-route');

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


app.use(route.post('/photo', photoController.create));
app.use(route.get('/photo/:id', photoController.find));

/**
 * Exports.
 */

module.exports = app;
