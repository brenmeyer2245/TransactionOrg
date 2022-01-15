const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

module.exports = db.define("User", {
  pk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userDisplayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  //TODO Encrypt
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
