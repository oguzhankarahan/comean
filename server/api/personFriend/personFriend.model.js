'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonFriendSchema = new Schema({
  personId: String,
  friendPersonId: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonFriend', PersonFriendSchema);
