var db = require('../config');
var Assignment = require('./assignment');
var Course = require('./course');

var Lesson = db.Model.extend({
  tableName : 'lessons',
  hasTimestamps: true,
  assignments: function(){
    return this.hasMany(Assignment);
  },
  course: function(){
    return this.belongsTo(Course, 'course_id');
  }

});

module.exports = Lesson;
