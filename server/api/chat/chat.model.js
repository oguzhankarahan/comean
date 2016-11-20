'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatSchema = new Schema({
  senderId: String,
  receiverId: String,
  chatTypeId: String,
  relationType: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  isSenderFromRemoved: {type: Boolean, default: false},
  isReceiverFromRemoved: {type: Boolean, default: false},
  active:{type:Boolean, default:true}


});

module.exports = mongoose.model('Chat', ChatSchema);
