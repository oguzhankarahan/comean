'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    required:true,
    unique:true},
  id:{      // id == facebookid,
    type:String,
    unique:true,
    required:true
  },
  image: String,
  avatar: String,
  avatarColor: String,
  gender: String,
  createdDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  bio: String,
  email: String,
  birthday: {type: Date, default: Date.now},
  longitude: String,
  latitude: String,
  active:{type:Boolean, default:true}
});

module.exports = mongoose.model('Person', PersonSchema);
