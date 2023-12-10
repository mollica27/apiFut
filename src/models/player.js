const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Player = sequelize.define('Player', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shirt_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Player;