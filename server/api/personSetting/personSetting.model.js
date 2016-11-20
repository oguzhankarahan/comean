'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSettingSchema = new Schema({
  personId: String,
  settingId: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonSetting', PersonSettingSchema);
