'use strict';

var express = require('express');
var controller = require('./personFriend.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/getPersonFriend/:id',controller.getPersonFriend);
router.get('/getPersonFriend/count/:id',controller.getPersonFriendCount);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;
