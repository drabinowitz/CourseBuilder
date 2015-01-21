var express     = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var passportHelper = require('./helpers/passport-helper');

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

app.use(bodyParser.urlencoded({ extended: true }));

passportHelper(app);

app.get('/github',passportHelper.authGithub);

app.get('/github/callback',passportHelper.authGithub);

app.use(express.static(__dirname + '/../client'));

app.route('/users/:id/courses')

  .get(function(req,res){
    if ((req.user && req.user.attributes.id.toString() === req.params.id) || req.params.id === '1'){
      new User({
        'id':req.params.id
      }).fetch({
        withRelated: ['courses']
      }).then(function(user){
        res.json(user);
      });
    } else {
      res.status(403).send();
    }
  })

  .post(function(req,res){
    if (req.user && req.user.attributes.id.toString() === req.params.id){
      new Course({
        'name':req.body.name,
        'user_id':req.params.id,
        'hours':req.body.hours
      }).save().then(function(course){
        res.json(course);
      });
    } else {
      res.status(403).send();
    }
  });

app.route('/users')

  .get(function(req,res){
    if (req.user){
      new User({
        'id':req.user.attributes.id
      }).fetch().then(function(user){
        res.json(user);
      });
    } else {
      res.status(403).send();
    }
  });

app.route('/courses/:courseId/lessons/:id/assignments')

  .get(function(req,res){
    req.user = req.user || {attributes:{id:-1}};
    new Course({
      'id':req.params.courseId,
      'user_id':req.user.attributes.id
    }).fetch().then(function(found){
      if ( found || req.params.courseId === '1'){
        new Lesson({
          'id':req.params.id,
          'course_id':req.params.courseId
        }).fetch({
          withRelated:['assignments']
        }).then(function(lesson){
          res.json(lesson);
        });
      } else {
        res.status(403).send();
      }
    });
  })

  //TODO: not secure
  .post(function(req,res){
    if (req.user){
      new Assignment({
        'name':req.body.name,
        'lesson_id':req.params.id,
        'hours':req.body.hours,
        'order':req.body.order,
        'type':req.body.type,
        'body':req.body.body
      }).save().then(function(assignment){
        res.json(assignment);
      });
    } else {
      res.status(403).send();
    }
  });

app.route('/courses/:id/lessons')

  .get(function(req,res){
    req.user = req.user || {attributes:{id:-1}};
    new Course({
      'id':req.params.id,
      'user_id':req.user.attributes.id
    }).fetch().then(function(found){
      if ( found || req.params.id === '1'){
        new Course({
          'id':req.params.id
        }).fetch({
          withRelated:['lessons']
        }).then(function(course){
          res.json(course);
        });
      } else {
        res.status(403).send();
      }
    });
  })

  .post(function(req,res){
    //TODO: not secure
    if (req.user){
      new Lesson({
        'name':req.body.name,
        'course_id':req.params.id,
        'hours':req.body.hours,
        'order':req.body.order,
      }).save().then(function(lesson){
        res.json(lesson);
      });
    } else {
      res.status(403).send();
    }
  });

module.exports = app;
