var db = require('../config');
var Lesson = require('./lesson');

var Assignment = db.Model.extend({
  tableName: 'assignments',
  hasTimestamps: true,
  lesson: function() {
    return this.belongsTo(Lesson, 'lesson_id');
  }
});

module.exports = Assignment;
