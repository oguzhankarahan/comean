'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonAvatarSchema = new Schema({
  personId: String,
  avatarId: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonAvatar', PersonAvatarSchema);
