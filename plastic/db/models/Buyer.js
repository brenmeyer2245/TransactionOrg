const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('Buyer', {
    pk: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    publicId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
   }
});

