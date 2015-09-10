'use strict';

const session = require('koa-session-store');
const mongoStore = require('koa-session-mongo');
const db = require('../db');
const passport = require('koa-passport');
const accountModel = require('../models/account');
const LocalStrategy = require('passport-local').Strategy;
const co = require('co');
const errors = require('./errors');

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  co(function* () {
    const user = yield accountModel.get(id);
    done(null, user);
  });
});

passport.use(new LocalStrategy(function (email, password, done) {
  co(function* () {
    const account = yield accountModel.getByEmail(email);
    if (account && account.password === password) return done(null, account);
    done(null, false);
  });
}));

/*
TODO: implement facebook and other auth types
var FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))
*/

module.exports = {
  initialize: function(app) {
    app.keys = ['secrsset'];
    app.use(session({
      cookie: {
        maxAge: 100000,
        httpOnly: false
      },
      store: mongoStore.create({
        db: db.driver,
        collection: 'sessions'
      })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
  },
  passport: passport,
  isAuthenticated: function* (next) {
    if (this.isAuthenticated()) {
      yield next;
    } else {
      throw new errors.AuthenticationError();
    }
  },
  login: function () {
    const self = this;
    return passport.authenticate('local', function* (err, user, info) {
      if (err) throw err;
      if (user === false) {
        throw new errors.AuthenticationError(info);
      } else {
        self.status = 201;
        self.body = user;
        yield self.login(user);
      }
    });
  }
};

