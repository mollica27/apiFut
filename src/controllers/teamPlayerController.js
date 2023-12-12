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

  editPlayerInTeam: async (req, res) => {
    try {
      const { teamId, playerId } = req.body;

      // Procura a associação no banco de dados pelo TeamId e PlayerId
      const teamPlayerToUpdate = await TeamPlayer.findOne({
        where: { TeamId: teamId, PlayerId: playerId },
      });

      // Verifica se a associação foi encontrada
      if (!teamPlayerToUpdate) {
        return res.status(404).json({ error: 'TeamPlayer not found' });
      }

      // Atualiza os dados da associação (se necessário)
      // Pode adicionar mais campos para edição conforme necessário
      await teamPlayerToUpdate.update({
        joined_at: new Date(),
      });

      res.json(teamPlayerToUpdate);
    } catch (error) {
      console.error('Error editing player in team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removePlayerFromTeam: async (req, res) => {
    try {
      const { teamId, playerId } = req.body;

      // Procura a associação no banco de dados pelo TeamId e PlayerId
      const teamPlayerToDelete = await TeamPlayer.findOne({
        where: { TeamId: teamId, PlayerId: playerId },
      });

      // Verifica se a associação foi encontrada
      if (!teamPlayerToDelete) {
        return res.status(404).json({ error: 'TeamPlayer not found' });
      }

      // Remove a associação do banco de dados
      await teamPlayerToDelete.destroy();

      res.json({ message: 'Player removed from team successfully' });
    } catch (error) {
      console.error('Error removing player from team:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = teamPlayerController;
