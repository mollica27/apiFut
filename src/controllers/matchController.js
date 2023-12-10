const Match = require('../models/match');

const matchController = {
  getAllMatches: async (req, res) => {
    try {
      const matches = await Match.findAll();
      res.json(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createMatch: async (req, res) => {
    try {
      const { match_date, start_time, end_time, score_team1, score_team2 } = req.body;

      // Verifica se todos os campos necessários foram fornecidos
      if (!match_date || !start_time || !end_time) {
        return res.status(400).json({ error: 'Match date, start time, and end time are required' });
      }

      // Cria a partida no banco de dados
      const newMatch = await Match.create({ match_date, start_time, end_time, score_team1, score_team2 });

      res.status(201).json(newMatch);
    } catch (error) {
      console.error('Error creating match:', error);

      if (error.name === 'SequelizeValidationError') {
        // Trata erros de validação do Sequelize
        const errors = error.errors.map((err) => ({
          message: err.message,
          field: err.path,
        }));

        res.status(400).json({ errors });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },

};

module.exports = matchController;
