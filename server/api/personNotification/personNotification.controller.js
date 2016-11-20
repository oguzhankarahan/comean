'use strict';

var _ = require('lodash');
var PersonNotification = require('./personNotification.model');

// Get list of personNotifications
exports.index = function(req, res) {
  PersonNotification.find(function (err, personNotifications) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personNotifications);
  });
};

// Get a single personNotification
exports.show = function(req, res) {
  PersonNotification.findById(req.params.id, function (err, personNotification) {
    if(err) { return handleError(res, err); }
    if(!personNotification) { return res.status(404).send('Not Found'); }
    return res.json(personNotification);
  });
};

// Creates a new personNotification in the DB.
exports.create = function(req, res) {
  PersonNotification.create(req.body, function(err, personNotification) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personNotification);
  });
};

// Updates an existing personNotification in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonNotification.findById(req.params.id, function (err, personNotification) {
    if (err) { return handleError(res, err); }
    if(!personNotification) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personNotification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personNotification);
    });
  });
};

// Deletes a personNotification from the DB.
exports.destroy = function(req, res) {
  PersonNotification.findById(req.params.id, function (err, personNotification) {
    if(err) { return handleError(res, err); }
    if(!personNotification) { return res.status(404).send('Not Found'); }
    personNotification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}