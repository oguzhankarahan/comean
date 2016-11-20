'use strict';

var _ = require('lodash');
var InterestParentType = require('./interestParentType.model');

// Get list of interestParentTypes
exports.index = function(req, res) {
  InterestParentType.find(function (err, interestParentTypes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(interestParentTypes);
  });
};

// Get a single interestParentType
exports.show = function(req, res) {
  InterestParentType.findById(req.params.id, function (err, interestParentType) {
    if(err) { return handleError(res, err); }
    if(!interestParentType) { return res.status(404).send('Not Found'); }
    return res.json(interestParentType);
  });
};

// Creates a new interestParentType in the DB.
exports.create = function(req, res) {
  InterestParentType.create(req.body, function(err, interestParentType) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(interestParentType);
  });
};

// Updates an existing interestParentType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  InterestParentType.findById(req.params.id, function (err, interestParentType) {
    if (err) { return handleError(res, err); }
    if(!interestParentType) { return res.status(404).send('Not Found'); }
    var updated = _.merge(interestParentType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(interestParentType);
    });
  });
};

// Deletes a interestParentType from the DB.
exports.destroy = function(req, res) {
  InterestParentType.findById(req.params.id, function (err, interestParentType) {
    if(err) { return handleError(res, err); }
    if(!interestParentType) { return res.status(404).send('Not Found'); }
    interestParentType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}