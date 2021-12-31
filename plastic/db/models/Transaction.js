const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('Transaction', {
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
   settlementDateTime: {
    type: DataTypes.DATE,
    allowNull: false
   },
   settlementAmount: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.00
   },
   transactionType: {
    type: DataTypes.STRING, 
    defaultValue: "sale"
   }
});

