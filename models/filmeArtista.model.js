const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const FilmeArtista = sequelize.define('FilmeArtista', {
  FilmeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ArtistaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = FilmeArtista;