'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChatTypeSchema = new Schema({
  name: String,
  id:String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('ChatType', ChatTypeSchema);
