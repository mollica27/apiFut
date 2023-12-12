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

  updatePlayer: async (req, res) => {
    try {
      const playerId = req.params.id;
      const { name, shirt_number } = req.body;

      const playerToUpdate = await Player.findByPk(playerId);

      if (!playerToUpdate) {
        return res.status(404).json({ error: 'Player not found.' });
      }

      // Atualizar os campos necessários
      playerToUpdate.name = name || playerToUpdate.name;
      playerToUpdate.shirt_number = shirt_number || playerToUpdate.shirt_number;

      // Salvar as alterações no banco de dados
      await playerToUpdate.save();

      res.json(playerToUpdate);
    } catch (error) {
      console.error('Error updating player:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = playerController;
