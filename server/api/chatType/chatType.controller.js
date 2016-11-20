'use strict';

var _ = require('lodash');
var ChatType = require('./chatType.model');

// Get list of chatTypes
exports.index = function(req, res) {
  ChatType.find(function (err, chatTypes) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(chatTypes);
  });
};

// Get a single chatType
exports.show = function(req, res) {
  ChatType.findById(req.params.id, function (err, chatType) {
    if(err) { return handleError(res, err); }
    if(!chatType) { return res.status(404).send('Not Found'); }
    return res.json(chatType);
  });
};

// Creates a new chatType in the DB.
exports.create = function(req, res) {
  ChatType.create(req.body, function(err, chatType) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(chatType);
  });
};

// Updates an existing chatType in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ChatType.findById(req.params.id, function (err, chatType) {
    if (err) { return handleError(res, err); }
    if(!chatType) { return res.status(404).send('Not Found'); }
    var updated = _.merge(chatType, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(chatType);
    });
  });
};

// Deletes a chatType from the DB.
exports.destroy = function(req, res) {
  ChatType.findById(req.params.id, function (err, chatType) {
    if(err) { return handleError(res, err); }
    if(!chatType) { return res.status(404).send('Not Found'); }
    chatType.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}