'use strict';

var _ = require('lodash');
var PersonFriend = require('./personFriend.model');
var Person = require('../person/person.model');

// Get list of personFriends
exports.index = function(req, res) {
  PersonFriend.find(function (err, personFriends) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personFriends);
  });
};

// Get a single personFriend
exports.show = function(req, res) {
  PersonFriend.findById(req.params.id, function (err, personFriend) {
    if(err) { return handleError(res, err); }
    if(!personFriend) { return res.status(404).send('Not Found'); }
    return res.json(personFriend);
  });
};

exports.getPersonFriend = function (req, res) {
  var personFriend = [];
  PersonFriend.find({ $or: { personId: req.params.id, friendPersonId: req.params.id } }, {friendPersonId: 1, _id: 0}, function (err, result) {
    for (var i = 0; i < result.length; i++) {
      personFriend.push(result[i].friendPersonId);
    }
    PersonFriend.find({_id: {$in: personFriend}}, function (err, result2) {
      return res.json(result2);
    })
  });
};

exports.getPersonFriendCount = function (req,res) {
    var personFriendCount = [];
  PersonFriend.find({ $or: [{ personId: req.params.id}, {friendPersonId: req.params.id } ]}, {friendPersonId: 1, _id: 0}, function (err, result) {
      for (var i = 0; i < result.length; i++) {
        personFriendCount.push(result[i].friendPersonId);
      }
      PersonFriend.find({_id: {$in: personFriendCount}}, function (err, result2) {
        return res.json(result2.length);
      })
    });
  };

// Creates a new personFriend in the DB.
exports.create = function(req, res) {
  PersonFriend.create(req.body, function(err, personFriend) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personFriend);
  });
};

// Updates an existing personFriend in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonFriend.findById(req.params.id, function (err, personFriend) {
    if (err) { return handleError(res, err); }
    if(!personFriend) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personFriend, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personFriend);
    });
  });
};

// Deletes a personFriend from the DB.
exports.destroy = function(req, res) {
  PersonFriend.findById(req.params.id, function (err, personFriend) {
    if(err) { return handleError(res, err); }
    if(!personFriend) { return res.status(404).send('Not Found'); }
    personFriend.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
