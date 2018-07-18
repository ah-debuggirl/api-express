const MONGOOSE = require('mongoose');

const USER_SCHEMA = MONGOOSE.Schema({
    userName: String,
    firstName: String,
    lastName: String
});

const USER = MONGOOSE.model('USER', USER_SCHEMA)
module.exports = USER;