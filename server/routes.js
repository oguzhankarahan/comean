/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/personStatuss', require('./api/personStatus'));
  app.use('/api/personSettings', require('./api/personSetting'));
  app.use('/api/personPushMessages', require('./api/personPushMessage'));
  app.use('/api/personNotifications', require('./api/personNotification'));
  app.use('/api/personLanguages', require('./api/personLanguage'));
  app.use('/api/personInterests', require('./api/personInterest'));
  app.use('/api/personInterests/personId/interestId', require('./api/personInterest'));
  app.use('/api/personImages', require('./api/personImage'));
  app.use('/api/personFriends/getPersonFriends', require('./api/personFriend'));
  app.use('/api/personFriends/getPersonFriends/Counts', require('./api/personFriend'));
  app.use('/api/personFriends/', require('./api/personFriend'));
  app.use('/api/personBlocks', require('./api/personBlock'));
  app.use('/api/personAvatars', require('./api/personAvatar'));
  app.use('/api/settings', require('./api/setting'));
  app.use('/api/requests', require('./api/request'));
  app.use('/api/persons', require('./api/person'));
  app.use('/api/persons/getPersonFriendByInterestOfset', require('./api/person'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/languages', require('./api/language'));
  app.use('/api/languages/getPersonLanguages', require('./api/language'));
  app.use('/api/interestTypes', require('./api/interestType'));
  app.use('/api/interestParentTypes', require('./api/interestParentType'));
  app.use('/api/interestInterestTypes', require('./api/interestInterestType'));
  app.use('/api/interests', require('./api/interest'));
  app.use('/api/interests/getPersonInterests', require('./api/interest'));
  app.use('/api/interests/getPersonNonInterests/Non', require('./api/interest'));
  app.use('/api/interests/getPersons/Interests/Counts', require('./api/interest'));
  app.use('/api/groupMembers', require('./api/groupMember'));
  app.use('/api/groups', require('./api/group'));
  app.use('/api/chatTypes', require('./api/chatType'));
  app.use('/api/chats', require('./api/chat'));
  app.use('/api/avatars', require('./api/avatar'));
  app.use('/api/notifications', require('./api/notification'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
