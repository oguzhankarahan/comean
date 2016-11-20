'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String, // Name of the group
  avatarImage: String, // Image of the group ( this will be uploaded physically and then stored as path)
  createdByName: String,
  createdById: Number, // creator of the group its phone number
  personId: String, // unique user id from couchdb
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('Group', GroupSchema);
