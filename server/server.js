var express     = require('express');
var bodyParser = require('body-parser');
var url = require('url');

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

app.get('/users/:id/courses', function(req,res){
  new User({
    'id':req.params.id
  }).fetch({
    withRelated: ['courses']
  }).then(function(user){
    res.json(user);
  });
});

app.get('/courses/:id/lessons', function(req,res){
  new Course({
    'id':req.params.id
  }).fetch({
    withRelated:['lessons']
  }).then(function(course){
    res.json(course);
  });
});

app.use(express.static(__dirname + '/../client'));

module.exports = app;
