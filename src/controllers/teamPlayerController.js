const TeamPlayer = require('../models/teamPlayer');

const teamPlayerController = {
  getAllTeamPlayers: async (req, res) => {
    try {
      const teamPlayers = await TeamPlayer.findAll();
      res.json(teamPlayers);
    } catch (error) {
      console.error('Error fetching team players:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addPlayerToTeam: async (req, res) => {
    try {
      const { teamId, playerId } = req.body;
      const teamPlayer = await TeamPlayer.create({
        TeamId: teamId,
        PlayerId: playerId,
        joined_at: new Date(),
      });
      res.json(teamPlayer);
    } catch (error) {
      console.error('Error adding player to team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = teamPlayerController;
