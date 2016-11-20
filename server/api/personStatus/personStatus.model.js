'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonStatusSchema = new Schema({
  personId: String,
  personNumber: String,
  sendMessage: {type: String, default: 0},
  deviceToken: String,  // device token for ios,
  createdDate:{type:Date,default:Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonStatus', PersonStatusSchema);
