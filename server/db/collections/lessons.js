var db = require('../config');
var Lesson = require('../models/lesson');

var Lessons = new db.Collection();

Lessons.model = Lesson;

module.exports = Lessons;
