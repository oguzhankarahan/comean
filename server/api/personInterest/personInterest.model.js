'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonInterestSchema = new Schema({
  interestId: String,
  personId: {type:String,ref:'Person'},
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonInterest', PersonInterestSchema);
