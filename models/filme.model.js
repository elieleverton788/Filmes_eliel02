const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Filme = sequelize.define('Filme', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anoLancamento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sinopse: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Filme;