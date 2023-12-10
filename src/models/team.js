const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Team = sequelize.define('Team', {
  team_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Team;
