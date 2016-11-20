'use strict';

var _ = require('lodash');
var Avatar = require('./avatar.model');

// Get list of avatars
exports.index = function(req, res) {
  Avatar.find(function (err, avatars) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(avatars);
  });
};

// Get a single avatar
exports.show = function(req, res) {
  Avatar.findById(req.params.id, function (err, avatar) {
    if(err) { return handleError(res, err); }
    if(!avatar) { return res.status(404).send('Not Found'); }
    return res.json(avatar);
  });
};

// Creates a new avatar in the DB.
exports.create = function(req, res) {
  Avatar.create(req.body, function(err, avatar) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(avatar);
  });
};


// Updates an existing avatar in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Avatar.findById(req.params.id, function (err, avatar) {
    if (err) { return handleError(res, err); }
    if(!avatar) { return res.status(404).send('Not Found'); }
    var updated = _.merge(avatar, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(avatar);
    });
  });
};

// Deletes a avatar from the DB.
exports.destroy = function(req, res) {
  Avatar.findById(req.params.id, function (err, avatar) {
    if(err) { return handleError(res, err); }
    if(!avatar) { return res.status(404).send('Not Found'); }
    avatar.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}