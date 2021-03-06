var mongoose = require('../config/db.js');
var Schema = mongoose.Schema;
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String
});
Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);