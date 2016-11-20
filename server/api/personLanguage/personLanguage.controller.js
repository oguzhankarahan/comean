'use strict';

var _ = require('lodash');
var PersonLanguage = require('./personLanguage.model');

// Get list of personLanguages
exports.index = function(req, res) {
  PersonLanguage.find(function (err, personLanguages) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(personLanguages);
  });
};

// Get a single personLanguage
exports.show = function(req, res) {
  PersonLanguage.findById(req.params.id, function (err, personLanguage) {
    if(err) { return handleError(res, err); }
    if(!personLanguage) { return res.status(404).send('Not Found'); }
    return res.json(personLanguage);
  });
};


exports.getPersonLanguage = function (req, res) {
  var personLanguage = [];
  PersonLanguage.find({personId: req.params.id}, {languageId: 1, _id: 0}, function (err, result) {
    for (var i = 0; i < result.length; i++) {
      personLanguage.push(result[i].languageId);
    }
    Language.find({_id: {$in: personLanguage}}, function (err, result2) {
      return res.json(result2);
    })
  });
};


// Creates a new personLanguage in the DB.
exports.create = function(req, res) {
  PersonLanguage.create(req.body, function(err, personLanguage) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(personLanguage);
  });
};

// Updates an existing personLanguage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PersonLanguage.findById(req.params.id, function (err, personLanguage) {
    if (err) { return handleError(res, err); }
    if(!personLanguage) { return res.status(404).send('Not Found'); }
    var updated = _.merge(personLanguage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(personLanguage);
    });
  });
};

// Deletes a personLanguage from the DB.
exports.destroy = function(req, res) {
  PersonLanguage.findById(req.params.id, function (err, personLanguage) {
    if(err) { return handleError(res, err); }
    if(!personLanguage) { return res.status(404).send('Not Found'); }
    personLanguage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
