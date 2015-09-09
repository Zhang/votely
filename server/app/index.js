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
    yield authentication.isAuthenticated(next);
  }
});
/**
 * Routes.
 */
app.use(mount('/photos', require('./controllers/photos')));
app.use(mount('/accounts', require('./controllers/accounts')));

/**
 * Exports.
 */

module.exports = app;
