'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InterestParentTypeSchema = new Schema({
  parentTypeId: String,
  interestId: String,
  active:{type:Boolean, default:true}
});

module.exports = mongoose.model('InterestParentType', InterestParentTypeSchema);
