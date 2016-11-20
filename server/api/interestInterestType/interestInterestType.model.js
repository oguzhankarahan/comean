'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InterestInterestTypeSchema = new Schema({
  interestId: String,
  interestTypeId: String,
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('InterestInterestType', InterestInterestTypeSchema);
