'use strict';

var _ = require('lodash');
var PersonSetting = require('./personSetting.model');

// Get list of personSettings
exports.index = function(req, res) {
  PersonSetting.find(function (err, personSettings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personSettings);
  });
};

// Get a single personSetting
exports.show = function(req, res) {
  PersonSetting.findById(req.params.id, function (err, personSetting) {
    if(err) { return handleError(res, err); }
    if(!personSetting) { return res.status(404).send('Not Found'); }
    return res.json(personSetting);
  });
};

// Creates a new personSetting in the DB.
exports.create = function(req, res) {
  PersonSetting.create(req.body, function(err, personSetting) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personSetting);
  });
};

// Updates an existing personSetting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonSetting.findById(req.params.id, function (err, personSetting) {
    if (err) { return handleError(res, err); }
    if(!personSetting) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personSetting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personSetting);
    });
  });
};

// Deletes a personSetting from the DB.
exports.destroy = function(req, res) {
  PersonSetting.findById(req.params.id, function (err, personSetting) {
    if(err) { return handleError(res, err); }
    if(!personSetting) { return res.status(404).send('Not Found'); }
    personSetting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}