'use strict';

var _ = require('lodash');
var PersonImage = require('./personImage.model');

// Get list of personImages
exports.index = function(req, res) {
  PersonImage.find(function (err, personImages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personImages);
  });
};

// Get a single personImage
exports.show = function(req, res) {
  PersonImage.findById(req.params.id, function (err, personImage) {
    if(err) { return handleError(res, err); }
    if(!personImage) { return res.status(404).send('Not Found'); }
    return res.json(personImage);
  });
};

// Creates a new personImage in the DB.
exports.create = function(req, res) {
  PersonImage.create(req.body, function(err, personImage) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personImage);
  });
};

// Updates an existing personImage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonImage.findById(req.params.id, function (err, personImage) {
    if (err) { return handleError(res, err); }
    if(!personImage) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personImage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personImage);
    });
  });
};

// Deletes a personImage from the DB.
exports.destroy = function(req, res) {
  PersonImage.findById(req.params.id, function (err, personImage) {
    if(err) { return handleError(res, err); }
    if(!personImage) { return res.status(404).send('Not Found'); }
    personImage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}