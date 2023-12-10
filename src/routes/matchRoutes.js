const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');

router.get('/', matchController.getAllMatches);
router.post('/', matchController.createMatch);


module.exports = router;
