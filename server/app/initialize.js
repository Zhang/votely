'use strict';

const app = require('koa')();
const router = require('koa-router')();

router.get('/', function() {
  this.body = {
    isAuthenticated: this.isAuthenticated()
  };
  this.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
