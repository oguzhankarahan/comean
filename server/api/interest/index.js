'use strict';

var express = require('express');
var controller = require('./interest.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/getPersonNonInterest/Non/:id',controller.getPersonNonInterest);
router.get('/getPersonInterest/:id',controller.getPersonInterest);
router.get('/getPerson/Interest/Count/:id',controller.getPersonInterestCount);

module.exports = router;
