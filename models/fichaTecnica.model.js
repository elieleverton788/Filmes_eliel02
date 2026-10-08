const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const FichaTecnica = sequelize.define('FichaTecnica', {
  duracao: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orcamento: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  bilheteria: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  }
});

module.exports = FichaTecnica;