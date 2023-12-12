const Team = require('../models/team');

const teamController = {
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.findAll();
      res.json(teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createTeam: async (req, res) => {
    try {
      const { team_name } = req.body;

      // Verifica se o nome da equipe foi fornecido
      if (!team_name) {
        return res.status(400).json({ error: 'Team name is required' });
      }

      // Cria a equipe no banco de dados
      const newTeam = await Team.create({ team_name });

      res.status(201).json(newTeam);
    } catch (error) {
      console.error('Error creating team:', error);

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

  editTeam: async (req, res) => {
    try {
      const { team_name } = req.body;
      const { id } = req.params;

      // Verifica se o nome da equipe foi fornecido
      if (!team_name) {
        return res.status(400).json({ error: 'Team name is required' });
      }

      // Procura a equipe no banco de dados pelo ID
      const teamToUpdate = await Team.findByPk(id);

      // Verifica se a equipe foi encontrada
      if (!teamToUpdate) {
        return res.status(404).json({ error: 'Team not found' });
      }

      // Atualiza os dados da equipe
      await teamToUpdate.update({ team_name });

      res.json(teamToUpdate);
    } catch (error) {
      console.error('Error editing team:', error);

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

module.exports = teamController;
