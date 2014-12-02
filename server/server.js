var express     = require('express');
var bodyParser = require('body-parser');

var db = require('./db/config');
var User = require('./db/models/user');
var Course = require('./db/models/course');
var Lesson = require('./db/models/lesson');
var Assignment = require('./db/models/assignment');
var Courses = require('./db/collections/courses');
var Lessons = require('./db/collections/lessons');
var Assignments = require('./db/collections/assignments');

var app = express();

app.use(bodyParser.json());

app.get('/users')

app.use(express.static(__dirname + '/../client'));

module.exports = app;
