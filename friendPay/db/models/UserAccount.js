const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('UserAccount', {
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
   accountName: {
    type: DataTypes.STRING,
    allowNull: false
   },
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
   }
});

