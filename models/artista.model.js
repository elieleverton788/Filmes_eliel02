const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Artista = sequelize.define('Artista', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anoNascimento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nomeArtistico: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tecnicasAtuacao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emAtividade: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Artista;