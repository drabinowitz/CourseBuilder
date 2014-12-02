var GITHUB = require('../../creds/github');
var SECRETS = require('../../creds/secrets');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var GithubStrategy = require('passport-github').Strategy;
var User = require('../db/models/user');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var authGen = function(strategy,successRedirect,failureRedirect){
  strategy = strategy || 'local';
  successRedirect = successRedirect || '/';
  failureRedirect = failureRedirect || '/login';

  return passport.authenticate(strategy,{
    successRedirect: successRedirect,
    failureRedirect: failureRedirect,
    failureFlash: true
  });
};

var passportHelper = function(app){

  app.use(cookieParser(SECRETS.COOKIE));
  app.use(session({
    secret: SECRETS.SESSION,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

/*  passport.use(new LocalStrategy(

    function(username,password,done){
      User.login(username,password)
        .then(function(user){
          return done(null, user);
        })
        .catch(function(err){
          return done(null,false,{message: err});
        });
    }

  ));*/

  passport.use(new GithubStrategy({
    clientID: GITHUB.CLIENT_ID,
    clientSecret: GITHUB.CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:8000/github/callback'
  },
  function(accessToken,refreshToken, profile, done){
    if (profile.username === 'Guest'){return;}
    new User({username: profile.username}).fetch()
      .then(function(user){
        if (!user){
          return new User({username: profile.username, authType: 'github'}).save();
        } else {
          return user;
        }
      })
      .then(function(user){
        if (user.get('authType') !== 'github') done(null,false,{message: 'username exists'});
        else done(null,user);
      });

  }));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    new User({id: id}).fetch()
      .then(function(user){
        done(null,user);
      })
      .catch(function(err){
        done(null,false,{message: err});
      });
  });

  // passportHelper.authenticate = authGen();

  passportHelper.authGithub = authGen('github');

};


passportHelper.verifyUser = function(req,res,next,destination){
  destination = destination || '/login';
  if (req.user){
    next();
  } else {
    res.redirect(destination);
  }
};

passportHelper.login = function(req,res,user,destination){
  destination = destination || '/';
  req.login(user, function(err){
    if (err)throw new Error(err);
    res.redirect(destination);
  });
};

passportHelper.logout = function(req,res,destination){
  destination = destination || '/login';
  req.logout();
  res.redirect(destination);
};

module.exports = passportHelper;
