'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SettingSchema = new Schema({
  name: String,
  info: String,
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('Setting', SettingSchema);
