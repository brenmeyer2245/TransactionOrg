const { plasticDB, friendPayDB } = require("./db/db");
const { readRecords } = require("./db/procedures");


readRecords(
  friendPayDB,
  `SELECT * FROM "Transactions" where amount = $1`,
  [10],
  console.log
);

readRecords(
    plasticDB,
  `SELECT * FROM "Transactions" where "settlementAmount" = $1`,
  [10],
  console.log
);
