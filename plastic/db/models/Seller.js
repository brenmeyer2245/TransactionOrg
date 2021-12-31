const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('Seller', {
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
   businessName: {
    type: DataTypes.STRING,
    allowNull: false
   },
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
   }
});

