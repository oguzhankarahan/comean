'use strict';

var _ = require('lodash');
var PersonInterest = require('./personInterest.model');
var Interest = require('../interest/interest.model');
var Person = require('../person/person.model');


// Get list of personInterests
exports.index = function(req, res) {
  PersonInterest.find(function (err, personInterests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personInterests);
  });
};

// Get a single personInterest
exports.show = function(req, res) {
  PersonInterest.findById(req.params.id, function (err, personInterest) {
    if(err) { return handleError(res, err); }
    if(!personInterest) { return res.status(404).send('Not Found'); }
    return res.json(personInterest);
  });
};

// Creates a new personInterest in the DB.
exports.create = function(req, res) {
  PersonInterest.create(req.body, function(err, personInterest) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personInterest);
  });
};

// Updates an existing personInterest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonInterest.findById(req.params.id, function (err, personInterest) {
    if (err) { return handleError(res, err); }
    if(!personInterest) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personInterest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personInterest);
    });
  });
};

// Deletes a personInterest from the DB.
exports.destroy = function(req, res) {
  PersonInterest.findById(req.params.id, function (err, personInterest) {
    if(err) { return handleError(res, err); }
    if(!personInterest) { return res.status(404).send('Not Found'); }
    personInterest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


exports.getPersonInterestControl = function (req, res) {
  var personInterest = [];

  PersonInterest.find({ $and: { personId: req.params.id, friendPersonId: req.params.id } }, function (err, result) {
     for (var i = 0; i < result.length; i++) {
       personInterest.push(result[i]._id);
     }
     return res.json(personInterest);
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
