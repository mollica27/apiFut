const express = require('express');
const router = express.Router();
const teamPlayerController = require('../controllers/teamPlayerController');

router.get('/', teamPlayerController.getAllTeamPlayers);
router.post('/add-player-to-team', teamPlayerController.addPlayerToTeam);

module.exports = router;
