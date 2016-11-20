'use strict';

var _ = require('lodash');
var PersonBlock = require('./personBlock.model');

// Get list of personBlocks
exports.index = function(req, res) {
  PersonBlock.find(function (err, personBlocks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personBlocks);
  });
};

// Get a single personBlock
exports.show = function(req, res) {
  PersonBlock.findById(req.params.id, function (err, personBlock) {
    if(err) { return handleError(res, err); }
    if(!personBlock) { return res.status(404).send('Not Found'); }
    return res.json(personBlock);
  });
};

// Creates a new personBlock in the DB.
exports.create = function(req, res) {
  PersonBlock.create(req.body, function(err, personBlock) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personBlock);
  });
};

// Updates an existing personBlock in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonBlock.findById(req.params.id, function (err, personBlock) {
    if (err) { return handleError(res, err); }
    if(!personBlock) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personBlock, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personBlock);
    });
  });
};

// Deletes a personBlock from the DB.
exports.destroy = function(req, res) {
  PersonBlock.findById(req.params.id, function (err, personBlock) {
    if(err) { return handleError(res, err); }
    if(!personBlock) { return res.status(404).send('Not Found'); }
    personBlock.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}