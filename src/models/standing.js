
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Standing = sequelize.define('Standing', {
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goals_scored: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Standing;
