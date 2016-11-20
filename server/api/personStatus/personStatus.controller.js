'use strict';

var _ = require('lodash');
var PersonStatus = require('./personStatus.model');

// Get list of personStatuss
exports.index = function(req, res) {
  PersonStatus.find(function (err, personStatuss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personStatuss);
  });
};

// Get a single personStatus
exports.show = function(req, res) {
  PersonStatus.findById(req.params.id, function (err, personStatus) {
    if(err) { return handleError(res, err); }
    if(!personStatus) { return res.status(404).send('Not Found'); }
    return res.json(personStatus);
  });
};

// Creates a new personStatus in the DB.
exports.create = function(req, res) {
  PersonStatus.create(req.body, function(err, personStatus) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personStatus);
  });
};

// Updates an existing personStatus in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonStatus.findById(req.params.id, function (err, personStatus) {
    if (err) { return handleError(res, err); }
    if(!personStatus) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personStatus, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personStatus);
    });
  });
};

// Deletes a personStatus from the DB.
exports.destroy = function(req, res) {
  PersonStatus.findById(req.params.id, function (err, personStatus) {
    if(err) { return handleError(res, err); }
    if(!personStatus) { return res.status(404).send('Not Found'); }
    personStatus.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}