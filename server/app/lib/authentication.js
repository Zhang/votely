'use strict';

const session = require('koa-session');
const passport = require('koa-passport');
const accountModel = require('../models/account');
const LocalStrategy = require('passport-local').Strategy;
const co = require('co');

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
      this.status = 401;
    }
  },
  login: function* (next) {
    const self = this;
    yield passport.authenticate('local', function* (err, user, info) {
      if (err) throw err;
      if (user === false) {
        self.status = 401;
        self.body = info;
      } else {
        self.status = 201;
        self.body = user;
        yield self.login(user);
      }
    }).call(this, next);
  }
};

