'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InterestTypeSchema = new Schema({
  name: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  createdPerson: String,
  modifiedPerson: String,
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('InterestType', InterestTypeSchema);
