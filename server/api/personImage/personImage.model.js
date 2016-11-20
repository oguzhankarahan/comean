'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonImageSchema = new Schema({
  personId: String,
  imageId: String,
  createdDate:{type:Date,default:Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonImage', PersonImageSchema);
