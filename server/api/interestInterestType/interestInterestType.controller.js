'use strict';

var _ = require('lodash');
var InterestInterestType = require('./interestInterestType.model');

// Get list of interestInterestTypes
exports.index = function(req, res) {
  InterestInterestType.find(function (err, interestInterestTypes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(interestInterestTypes);
  });
};

// Get a single interestInterestType
exports.show = function(req, res) {
  InterestInterestType.findById(req.params.id, function (err, interestInterestType) {
    if(err) { return handleError(res, err); }
    if(!interestInterestType) { return res.status(404).send('Not Found'); }
    return res.json(interestInterestType);
  });
};

// Creates a new interestInterestType in the DB.
exports.create = function(req, res) {
  InterestInterestType.create(req.body, function(err, interestInterestType) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(interestInterestType);
  });
};

// Updates an existing interestInterestType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  InterestInterestType.findById(req.params.id, function (err, interestInterestType) {
    if (err) { return handleError(res, err); }
    if(!interestInterestType) { return res.status(404).send('Not Found'); }
    var updated = _.merge(interestInterestType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(interestInterestType);
    });
  });
};

// Deletes a interestInterestType from the DB.
exports.destroy = function(req, res) {
  InterestInterestType.findById(req.params.id, function (err, interestInterestType) {
    if(err) { return handleError(res, err); }
    if(!interestInterestType) { return res.status(404).send('Not Found'); }
    interestInterestType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}