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
  
};

module.exports = standingController;
