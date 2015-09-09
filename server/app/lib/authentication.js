'use strict';

const session = require('koa-session');
const passport = require('koa-passport');
const accountModel = require('../models/account');
const LocalStrategy = require('passport-local').Strategy;
const co = require('co');

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function* (id, done) {
  console.log(id);
  const user = yield accountModel.get(id);
  console.log(user);
  done(null, user);
});

passport.use(new LocalStrategy(function (email, password, done) {
  //const user = yield accountModel.getByEmail(email);
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
    app.keys = ['secret'];
    app.use(session(app));

    app.use(passport.initialize());
    app.use(passport.session());
  },
  passport: passport,
  isAuthenticated: function* (next) {
    if (this.isAuthenticated()) {
      yield next;
    } else {
      console.log('wtf');
      this.status = 401;
    }
  }
};

