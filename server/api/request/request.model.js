'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  senderId: String,
  senderPersonName: String,
  senderAvatar: String,
  senderImage: String,
  senderAvatarColor: String,
  receiverId: String,
  requestTypeId: String,
  description: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  response: {type: Boolean, default: false},
  isResponsed: {type: Boolean, default: false},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('Request', RequestSchema);
