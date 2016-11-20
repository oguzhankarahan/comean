'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonNotificationSchema = new Schema({
  personId: String,
  notificationId: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonNotification', PersonNotificationSchema);
