'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonPushMessageSchema = new Schema({
  deviceToken: String, // Device Token
  sendMessage: {type: Number, default: 0},
  createdDate:{type:Date,default:Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonPushMessage', PersonPushMessageSchema);
