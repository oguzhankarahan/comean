'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  senderId: String,
  receiverId: String,
  content: String,
  chatId: String,
  createdDate: {type: Date, default: Date.now},
  isReadFlag: {type: Boolean, default: false},
  isEvent: {type: Boolean, default: false},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('Message', MessageSchema);
