'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LanguageSchema = new Schema({
  name: String,
  id: String,
  path: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  createdPerson: String,
  modifiedPerson: String,
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('Language', LanguageSchema);
