const express = require('express');
const router = express.Router();
const standingController = require('../controllers/standingController');

router.get('/', standingController.getAllStandings);
router.post('/', standingController.createStanding);
router.put('/', standingController.editStanding);
module.exports = router;
