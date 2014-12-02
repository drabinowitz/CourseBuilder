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
  this.timeout(5000);

  it('should have a Guest user',function(done){
    new User({
      'username': 'Guest'
    }).fetch().then(function(user){
      console.log(user);
      done();
    });
  });

});
