'use strict';

var _ = require('lodash');
var Notification = require('./notification.model');
var PersonNotification = require('../personNotification/personNotification.model');

// Get list of notifications
exports.index = function(req, res) {
  Notification.find(function (err, notifications) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(notifications);
  });
};



// Get a single notification
exports.show = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.status(404).send('Not Found'); }
    return res.json(notification);
  });
};

// Creates a new notification in the DB.
exports.create = function(req, res) {
  Notification.create(req.body, function(err, notification) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(notification);
  });
};

// Updates an existing notification in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Notification.findById(req.params.id, function (err, notification) {
    if (err) { return handleError(res, err); }
    if(!notification) { return res.status(404).send('Not Found'); }
    var updated = _.merge(notification, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(notification);
    });
  });
};

// Deletes a notification from the DB.
exports.destroy = function(req, res) {
  Notification.findById(req.params.id, function (err, notification) {
    if(err) { return handleError(res, err); }
    if(!notification) { return res.status(404).send('Not Found'); }
    notification.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


exports.getPersonNotification = function (req, res) {
  var personNotification = [];
  PersonNotification.find({personId: req.params.id}, {languageId: 1, _id: 0}, function (err, result) {
    for (var i = 0; i < result.length; i++) {
      personNotification.push(result[i].languageId);
    }
    Notification.find({_id: {$in: personNotification}}, function (err, result2) {
      return res.json(result2);
    })
  });
};



function handleError(res, err) {
  return res.status(500).send(err);
}
