'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonLanguageSchema = new Schema({
  personId: String,
  languageId: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate:{type:Date,default:Date.now},
  active:{type:Boolean, default:true}

});

module.exports = mongoose.model('PersonLanguage', PersonLanguageSchema);
