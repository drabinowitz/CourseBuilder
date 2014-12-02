var expect = require('chai').expect;
var request = require('request');

var db = require('../../server/db/config');
var User = require('../../server/db/models/user');
var Course = require('../../server/db/models/course');
var Lesson = require('../../server/db/models/lesson');
var Assignment = require('../../server/db/models/assignment');
var Courses = require('../../server/db/collections/courses');
var Lessons = require('../../server/db/collections/lessons');
var Assignments = require('../../server/db/collections/assignments');

describe('Guest user and associated courses, lessons, and assignments',function(){
  this.timeout(10000);

  beforeEach(function(done){
    new User({
      'username': 'Guest'
    }).fetch().then(function(found){
      if (found) return found;
      else {
        return new User({
          'username': 'Guest',
          'authType': 'guest'
        }).save();
      }
    }).then(function(user){
      return new Course({
        'user_id': user.attributes.id
      }).fetch().then(function(found){
        if (found) return found;
        else {
          return new Course({
            'name': 'Guest Course',
            'hours': 10,
            'user_id':user.attributes.id
          }).save();
        }
      }).then(function(course){
        return new Lesson({
          'course_id': course.attributes.id
        }).fetchAll().then(function(found){
          if (found.length) return found;
          else {
            return new Lesson({
              'name':'Lesson 1',
              'course_id': course.attributes.id,
              'hours': 3,
              'order': 0
            }).save().then(function(){
              return new Lesson({
                'name':'Lesson 2',
                'course_id': course.attributes.id,
                'hours': 4,
                'order': 1
              }).save().then(function(){
                return new Lesson({
                  'name':'Lesson 3',
                  'course_id': course.attributes.id,
                  'hours': 3,
                  'order': 2
                }).save();
              });
            });
          }
        }).then(function(lessons){
          return new Assignment({
            'lesson_id': 1
          }).fetchAll().then(function(found){
            if (found.length) return found;
            else {
              return new Assignment({
                'name':'In Class Assignment',
                'lesson_id': 1,
                'hours': 3,
                'order': 0,
                'body' : 'Here is the first lesson'
              }).save().then(function(){
                return new Assignment({
                  'name':'Homework Assignment',
                  'lesson_id': 1,
                  'hours': 0,
                  'order': 1,
                  'body':'It can have many assignments'
                }).save();
              });
            }
          }).then(function(){
            done();
          });
        });
      });
    });
  });

  it('should have a Guest user',function(done){
    new User({
      'username': 'Guest'
    }).fetch().then(function(user){
      expect(user.attributes.username).to.equal('Guest');
      expect(user.attributes.id).to.equal(1);
      done();
    });
  });

  it('should have a Guest Course for the Guest user',function(done){
    new Course({
      'user_id': 1
    }).fetch().then(function(course){
      expect(course.attributes.name).to.equal('Guest Course');
      expect(course.attributes.id).to.equal(1);
      expect(course.attributes.hours).to.equal(10);
      done();
    });
  });

  it('should have the lessons for the Guest Course course', function(done){
    new Lesson({
      'course_id': 1
    }).fetchAll().then(function(lessons){
      var lesson1 = lessons.at(0);
      var lesson2 = lessons.at(1);
      var lesson3 = lessons.at(2);
      expect(lesson1.attributes.name).to.equal('Lesson 1');
      expect(lesson1.attributes.id).to.equal(1);
      expect(lesson1.attributes.hours).to.equal(3);
      expect(lesson1.attributes.order).to.equal(0);
      expect(lesson2.attributes.name).to.equal('Lesson 2');
      expect(lesson2.attributes.id).to.equal(2);
      expect(lesson2.attributes.hours).to.equal(4);
      expect(lesson2.attributes.order).to.equal(1);
      expect(lesson3.attributes.name).to.equal('Lesson 3');
      expect(lesson3.attributes.id).to.equal(3);
      expect(lesson3.attributes.hours).to.equal(3);
      expect(lesson3.attributes.order).to.equal(2);
      done();
    });
  });

  it('should have assignments in the Lesson 1 lesson', function(done){
    new Assignment({
      'lesson_id': 1
    }).fetchAll().then(function(assignments){
      var assignment1 = assignments.at(0);
      var assignment2 = assignments.at(1);
      expect(assignment1.attributes.name).to.equal('In Class Assignment');
      expect(assignment1.attributes.id).to.equal(1);
      expect(assignment1.attributes.hours).to.equal(3);
      expect(assignment1.attributes.order).to.equal(0);
      expect(assignment1.attributes.type).to.equal('text');
      expect(assignment1.attributes.body).to.equal('Here is the first lesson');
      expect(assignment2.attributes.name).to.equal('Homework Assignment');
      expect(assignment2.attributes.id).to.equal(2);
      expect(assignment2.attributes.hours).to.equal(0);
      expect(assignment2.attributes.order).to.equal(1);
      expect(assignment2.attributes.type).to.equal('text');
      expect(assignment2.attributes.body).to.equal('It can have many assignments');
      done();
    });
  });

});

describe('should be able to access the Guest User courses', function(){

  this.timeout(5000);

  it('should respond with courses for the associated user id', function(done){
    request('http://127.0.0.1:8000/users/1/courses', function(error, res, body){
      var user = JSON.parse(body);
      expect(user.username).to.equal('Guest');
      expect(user.id).to.equal(1);
      var course1 = user.courses[0];
      expect(course1.name).to.equal('Guest Course');
      expect(course1.id).to.equal(1);
      expect(course1.hours).to.equal(10);
      done();
    });
  });

  it('should respond with lessons for the associated course', function(done){
    request('http://127.0.0.1:8000/courses/1/lessons', function(error, res, body){
      var course = JSON.parse(body);
      expect(course.name).to.equal('Guest Course');
      expect(course.id).to.equal(1);
      expect(course.hours).to.equal(10);
      var lesson1 = course.lessons[0];
      var lesson2 = course.lessons[1];
      var lesson3 = course.lessons[2];
      expect(lesson1.name).to.equal('Lesson 1');
      expect(lesson1.id).to.equal(1);
      expect(lesson1.hours).to.equal(3);
      expect(lesson1.order).to.equal(0);
      expect(lesson2.name).to.equal('Lesson 2');
      expect(lesson2.id).to.equal(2);
      expect(lesson2.hours).to.equal(4);
      expect(lesson2.order).to.equal(1);
      expect(lesson3.name).to.equal('Lesson 3');
      expect(lesson3.id).to.equal(3);
      expect(lesson3.hours).to.equal(3);
      expect(lesson3.order).to.equal(2);
      done();
    });
  });

});
