'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonBlockSchema = new Schema({
  personId: String,
  blockedPersonId: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonBlock', PersonBlockSchema);
