const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');

const Diretor = sequelize.define('Diretor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anoNascimento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  emAtividade: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Diretor;