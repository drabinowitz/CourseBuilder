var db = require('../config');
var Assignment = require('../models/assignment');

var Assignments = new db.Collection();

Assignments.model = Assignment;

module.exports = Assignments;
