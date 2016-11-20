'use strict';

var _ = require('lodash');
var PersonPushMessage = require('./personPushMessage.model');

// Get list of personPushMessages
exports.index = function(req, res) {
  PersonPushMessage.find(function (err, personPushMessages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personPushMessages);
  });
};

// Get a single personPushMessage
exports.show = function(req, res) {
  PersonPushMessage.findById(req.params.id, function (err, personPushMessage) {
    if(err) { return handleError(res, err); }
    if(!personPushMessage) { return res.status(404).send('Not Found'); }
    return res.json(personPushMessage);
  });
};

// Creates a new personPushMessage in the DB.
exports.create = function(req, res) {
  PersonPushMessage.create(req.body, function(err, personPushMessage) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personPushMessage);
  });
};

// Updates an existing personPushMessage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonPushMessage.findById(req.params.id, function (err, personPushMessage) {
    if (err) { return handleError(res, err); }
    if(!personPushMessage) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personPushMessage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personPushMessage);
    });
  });
};

// Deletes a personPushMessage from the DB.
exports.destroy = function(req, res) {
  PersonPushMessage.findById(req.params.id, function (err, personPushMessage) {
    if(err) { return handleError(res, err); }
    if(!personPushMessage) { return res.status(404).send('Not Found'); }
    personPushMessage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}