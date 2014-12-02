var db = require('../config');
var Course = require('./course');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var autoLogin = function(username,password,user){return user;};

var login = {};

login.local = function(username,password,user){
  return bcrypt.compareAsync(password,user.get('password'));
};

login.github = autoLogin;
login.facebook = autoLogin;

var autoSignup = function(authType,username,password){
  return new User({
    username: username,
    authType: authType
  }).save();
};

var signup = {};

signup.local = function(authType,username,password){
  return new User({
    username: username,
    password: password
  }).save();
};

signup.github = autoSignup;
signup.facebook = autoSignup;

var User = db.Model.extend({
  tablename: 'users',
  hasTimestamps: true,
  courses: function() {
    return this.hasMany(Course);
  },

  initialize: function() {
    this.on('saving', function(model,attrs,options){
      if (model.get('authType') === 'local'){
        var password = model.get('password');
        var salt = bcrypt.genSaltSync();
        var hash = bcrypt.hashSync(password);
        model.set('password',hash);
      }
    });
  }
},{

  login: Promise.method(function(username,password){
    if(!username) throw new Error ('username required');
    return new this({username: username}).fetch({require: true}).tap(function(user){
      return login[user.get('authType')](username,password,user);
    });
  }),

  signup: Promise.method(function(authType,username,password){
   return new User({username: username}).feth()
      .then(function(found){
        if (found) throw new Error ('username already exists');
        return signup[authType](authType,username,password);
    });
  })
});

module.exports = User;

