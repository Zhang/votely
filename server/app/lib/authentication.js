'use strict';

const session = require('koa-session');
const passport = require('koa-passport');
const accountModel = require('../models/account');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function* (id, done) {
  const user = yield accountModel.get(id);
  done(null, user);
});

passport.use(new LocalStrategy(function* (email, password, done) {
  const user = yield accountModel.getByEmail(email);
  if (user && user.password === password) return done(null, user);
  done(null, false);
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
    app.keys = ['secret'];
    app.use(session(app));

    app.use(passport.initialize());
    app.use(passport.session());
  },
  passport: passport,
  isAuthenticated: function* (next) {
    if (this.isAuthenticated()) return yield next;
    this.status = 401;
  }
};

