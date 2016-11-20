'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupMemberSchema = new Schema({
  groupId: String, //  Group id  foreigh key from group table
  personNumber: String, // User phone number
  personId: String,    // userid which is foreign key from user table couchdb
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('GroupMember', GroupMemberSchema);
