var db = require('../config');
var Lesson = require('./lesson');
var User = require('./user');

var Course = db.Model.extend({
  tableName : 'courses',
  hasTimestamps: true,
  lessons: function(){
    return this.hasMany(Lesson);
  },
  user: function(){
    return this.belongsTo(User, 'user_id');
  }

});

module.exports = Course;
