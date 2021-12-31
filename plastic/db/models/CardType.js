const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('CardType', {
    pk: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
   name: {
    type: DataTypes.STRING, 
    allowNull: false
   }
});

