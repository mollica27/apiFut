const Standing = require('../models/standing');

const standingController = {
  getAllStandings: async (req, res) => {
    try {
      const standings = await Standing.findAll();
      res.json(standings);
    } catch (error) {
      console.error('Error fetching standings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createStanding: async (req, res) => {
    try {
      const { points, goals_scored } = req.body;
      const newStanding = await Standing.create({
        points,
        goals_scored,
      });
      res.json(newStanding);
    } catch (error) {
      console.error('Error creating standing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  editStanding: async (req, res) => {
    try {
      const { standingId, points, goals_scored } = req.body;

      // Procura a classificação no banco de dados pelo ID
      const standingToUpdate = await Standing.findByPk(standingId);

      // Verifica se a classificação foi encontrada
      if (!standingToUpdate) {
        return res.status(404).json({ error: 'Standing not found' });
      }

      // Atualiza os dados da classificação
      await standingToUpdate.update({
        points,
        goals_scored,
      });

      res.json(standingToUpdate);
    } catch (error) {
      console.error('Error editing standing:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = standingController;
