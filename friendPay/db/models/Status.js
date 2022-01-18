const {Sequelize, DataTypes} = require('sequelize');
const db = require('../db');

module.exports = db.define('Status', {
    pk: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true, 
        unique: true, 
        autoIncrement: true
    },
    value : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

