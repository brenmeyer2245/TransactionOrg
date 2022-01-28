const { Client } = require("pg");

const BASE_CONNECTION_STRING = "postgres://fsa150@localhost:5432/";

const plasticDB = new Client({
  connectionString: BASE_CONNECTION_STRING + "plastic",
});

const friendPayDB = new Client({
  connectionString: BASE_CONNECTION_STRING + "friendPay",
});

module.exports = {
    plasticDB,
    friendPayDB
}
