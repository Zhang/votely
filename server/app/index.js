'use strict';

/**
 * Module dependencies.
 */

const bodyParser = require('koa-bodyparser');
const koa = require('koa');
const mount = require('koa-mount');
const logger = require('koa-logger');
const cors = require('kcors');
const authentication = require('./lib/authentication');
const _ = require('lodash');
const errors = require('./lib/errors');

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
app.use(cors({
  credentials: true
}));
app.use(logger());

errors.initialize(app);

authentication.initialize(app);
app.use(function* authenticatePrivateRoutes(next) {
  const PUBLIC_ROUTES = [{
    method: 'POST',
    url: '/accounts/'
  }];

  function isPublicRoute(url, method) {
    return _.any(PUBLIC_ROUTES, function(route) {
      return route.url === url && method === route.method;
    });
  }

  if (isPublicRoute(this.originalUrl, this.request.method)) {
    yield next;
  } else {
    yield authentication.isAuthenticated.call(this, next);
  }
});
/**
 * Routes.
 */
app.use(mount('/login', require('./login')));
app.use(mount('/photos', require('./controllers/photos')));
app.use(mount('/accounts', require('./controllers/accounts')));

/**
 * Exports.
 */

module.exports = app;
