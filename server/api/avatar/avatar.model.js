'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AvatarSchema = new Schema({
  name: String,
  id: String,
  className: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  createdPerson: String,
  modifiedPerson: String,
  active:{type:Boolean, default:true}
});

module.exports = mongoose.model('Avatar', AvatarSchema);
