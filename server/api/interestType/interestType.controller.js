'use strict';

var _ = require('lodash');
var InterestType = require('./interestType.model');

// Get list of interestTypes
exports.index = function(req, res) {
  InterestType.find(function (err, interestTypes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(interestTypes);
  });
};

// Get a single interestType
exports.show = function(req, res) {
  InterestType.findById(req.params.id, function (err, interestType) {
    if(err) { return handleError(res, err); }
    if(!interestType) { return res.status(404).send('Not Found'); }
    return res.json(interestType);
  });
};

// Creates a new interestType in the DB.
exports.create = function(req, res) {
  InterestType.create(req.body, function(err, interestType) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(interestType);
  });
};

// Updates an existing interestType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  InterestType.findById(req.params.id, function (err, interestType) {
    if (err) { return handleError(res, err); }
    if(!interestType) { return res.status(404).send('Not Found'); }
    var updated = _.merge(interestType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(interestType);
    });
  });
};

// Deletes a interestType from the DB.
exports.destroy = function(req, res) {
  InterestType.findById(req.params.id, function (err, interestType) {
    if(err) { return handleError(res, err); }
    if(!interestType) { return res.status(404).send('Not Found'); }
    interestType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}