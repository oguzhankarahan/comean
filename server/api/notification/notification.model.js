'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  senderId: String,
  senderUserName: String,
  receiverId: String,
  senderAvatar: String,
  senderImage: String,
  senderAvatarColor: String,
  notificationTypeId: String,
  description: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  readFlag: {type: Boolean, default: false},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('Notification', NotificationSchema);
