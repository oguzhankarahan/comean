'use strict';

var express = require('express');
var controller = require('./person.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:personid/:interestid/:startIndex/:rowCount', controller.getPersonFriendByInterestOfset);


module.exports = router;
