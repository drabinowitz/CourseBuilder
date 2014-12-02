var db = require('../config');
var Course = require('../models/course');

var Courses = new db.Collection();

Courses.model = Course;

module.exports = Courses;
