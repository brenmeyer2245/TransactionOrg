const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('Card', {
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
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
   },
   cardNumber: {
    type: DataTypes.STRING,
    allowNull: false
   },
   expirationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
   }
});

