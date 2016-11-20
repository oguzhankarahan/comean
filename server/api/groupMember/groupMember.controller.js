'use strict';

var _ = require('lodash');
var GroupMember = require('./groupMember.model');

// Get list of groupMembers
exports.index = function(req, res) {
  GroupMember.find(function (err, groupMembers) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(groupMembers);
  });
};

// Get a single groupMember
exports.show = function(req, res) {
  GroupMember.findById(req.params.id, function (err, groupMember) {
    if(err) { return handleError(res, err); }
    if(!groupMember) { return res.status(404).send('Not Found'); }
    return res.json(groupMember);
  });
};

// Creates a new groupMember in the DB.
exports.create = function(req, res) {
  GroupMember.create(req.body, function(err, groupMember) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(groupMember);
  });
};

// Updates an existing groupMember in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  GroupMember.findById(req.params.id, function (err, groupMember) {
    if (err) { return handleError(res, err); }
    if(!groupMember) { return res.status(404).send('Not Found'); }
    var updated = _.merge(groupMember, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(groupMember);
    });
  });
};

// Deletes a groupMember from the DB.
exports.destroy = function(req, res) {
  GroupMember.findById(req.params.id, function (err, groupMember) {
    if(err) { return handleError(res, err); }
    if(!groupMember) { return res.status(404).send('Not Found'); }
    groupMember.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}