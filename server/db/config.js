var Bookshelf = require('bookshelf');
var path = require('path');
var SQLITE3 = require('../../creds/SQLITE3');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: SQLITE3.HOST,
    user: SQLITE3.USER,
    password: SQLITE3.PASSWORD,
    database: SQLITE3.DATABASE,
    charset: 'utf8',
    filename: path.join(__dirname, 'storage/' + SQLITE3.DATABASE + '.sqlite')
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('name',255).unique();
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
      assignment.integer('order');
      assignment.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
