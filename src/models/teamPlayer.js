
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const TeamPlayer = sequelize.define('TeamPlayer', {
  joined_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Definindo relações
const Team = require('./team');
const Player = require('./player');

Team.belongsToMany(Player, { through: TeamPlayer });
Player.belongsToMany(Team, { through: TeamPlayer });

module.exports = TeamPlayer;
