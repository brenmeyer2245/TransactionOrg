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
   date: {
    type: DataTypes.DATE,
    allowNull: false
   },
   amount: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.00
   },
   status : {
       type: DataTypes.STRING
   }
});

