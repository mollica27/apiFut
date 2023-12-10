const Player = require('../models/player');

const playerController = {
  getAllPlayers: async (req, res) => {
    try {
      const players = await Player.findAll();
      res.json(players);
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createPlayer: async (req, res) => {
    try {
      // Extrair dados do corpo da solicitação
      const { name, shirt_number } = req.body;

      // Validar se os dados necessários estão presentes
      if (!name || !shirt_number) {
        return res.status(400).json({ error: 'Name and shirt_number are required.' });
      }

      // Criar jogador no banco de dados
      const newPlayer = await Player.create({
        name,
        shirt_number,
      });

      // Responder com o novo jogador criado
      res.status(201).json(newPlayer);
    } catch (error) {
      console.error('Error creating player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = playerController;
