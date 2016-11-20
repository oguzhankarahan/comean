'use strict';

var _ = require('lodash');
var PersonAvatar = require('./personAvatar.model');

// Get list of personAvatars
exports.index = function(req, res) {
  PersonAvatar.find(function (err, personAvatars) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personAvatars);
  });
};

// Get a single personAvatar
exports.show = function(req, res) {
  PersonAvatar.findById(req.params.id, function (err, personAvatar) {
    if(err) { return handleError(res, err); }
    if(!personAvatar) { return res.status(404).send('Not Found'); }
    return res.json(personAvatar);
  });
};

// Creates a new personAvatar in the DB.
exports.create = function(req, res) {
  PersonAvatar.create(req.body, function(err, personAvatar) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personAvatar);
  });
};

// Updates an existing personAvatar in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonAvatar.findById(req.params.id, function (err, personAvatar) {
    if (err) { return handleError(res, err); }
    if(!personAvatar) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personAvatar, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personAvatar);
    });
  });
};

// Deletes a personAvatar from the DB.
exports.destroy = function(req, res) {
  PersonAvatar.findById(req.params.id, function (err, personAvatar) {
    if(err) { return handleError(res, err); }
    if(!personAvatar) { return res.status(404).send('Not Found'); }
    personAvatar.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}