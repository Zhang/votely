'use strict';

const onerror = require('koa-onerror');

function DuplicateError(type, value) {
  this.name = 'DuplicateError';
  this.message = 'Unable to add duplicate ' + type + ' with value : ' + JSON.stringify(value);
  this.status = 400;
  this.stack = (new Error()).stack;
}
DuplicateError.prototype = Object.create(Error.prototype);
DuplicateError.prototype.constructor = DuplicateError;

function NotFoundError(type, value) {
  this.name = 'NotFoundError';
  this.message = 'Unable to find ' + type + ' with value : ' + JSON.stringify(value);
  this.status = 400;
  this.stack = (new Error()).stack;
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

function AuthenticationError(info) {
  console.log('Not atuthenticated: ', info);
  this.name = 'AuthenticationError';
  this.message = 'Not authenticated';
  this.status = 401;
  this.stack = (new Error()).stack;
}
AuthenticationError.prototype = Object.create(Error.prototype);
AuthenticationError.prototype.constructor = AuthenticationError;

function LoginError() {
  this.name = 'LoginError';
  this.message = 'Failed Login';
  this.status = 400;
  this.stack = (new Error()).stack;
}
LoginError.prototype = Object.create(Error.prototype);
LoginError.prototype.constructor = LoginError;

module.exports = {
  initialize: function(app) {
    onerror(app);
    app.on('error', function logError(err) {
      console.error(err.stack);
    });
  },
  DuplicateError: DuplicateError,
  AuthenticationError: AuthenticationError,
  NotFoundError: NotFoundError,
  LoginError: LoginError
};
