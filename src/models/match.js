
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Match = sequelize.define('Match', {
  match_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  score_team1: {
    type: DataTypes.INTEGER,
  },
  score_team2: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Match;
