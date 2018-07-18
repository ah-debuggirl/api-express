const MONGOOSE = require('mongoose');

const TASK_SCHEMA = MONGOOSE.Schema({
    title: String,
    description: String
});

const TASK = MONGOOSE.model('TASK', TASK_SCHEMA)
module.exports = TASK;