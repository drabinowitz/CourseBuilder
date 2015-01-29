var Bookshelf = require('bookshelf');
var path = require('path');
// var SQLITE3 = require('../../creds/SQLITE3');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: process.env.SQLITE3_HOST,
    user: process.env.SQLITE3_USER,
    password: process.env.SQLITE3_PASSWORD,
    database: process.env.SQLITE3_DATABASE,
    charset: 'utf8',
    filename: path.join(__dirname, 'storage/' + process.env.SQLITE3_DATABASE + '.sqlite')
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username',255).unique();
      user.string('password',255);
      user.string('authType',255).defaultTo('local');
      user.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('courses').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('courses', function(course) {
      course.increments('id').primary();
      course.integer('user_id');
      course.string('name',255).defaultTo('New Course');
      course.integer('hours').defaultTo(30);
      course.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('lessons').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('lessons', function(lesson) {
      lesson.increments('id').primary();
      lesson.integer('course_id');
      lesson.string('name',255).defaultTo('New Lesson');
      lesson.integer('hours').defaultTo(3);
      lesson.integer('order');
      lesson.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('assignments').then(function(exists) {
  if (!exists){
    db.knex.schema.createTable('assignments', function(assignment){
      assignment.increments('id').primary();
      assignment.integer('lesson_id');
      assignment.string('name',255).defaultTo('New Assignment');
      assignment.string('type',255).defaultTo('text');
      assignment.string('body',255);
      assignment.integer('hours').defaultTo(0);
      assignment.integer('order');
      assignment.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
