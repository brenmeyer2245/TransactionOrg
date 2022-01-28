const QueryStream = require("pg-query-stream");
const JSONStream = require("JSONStream");

const readRecords = async (
  db,
  queryString,
  conditionalValues,
  actionOnRow
) => {
  console.log("Reading Records");
  await db.connect();
  const query = new QueryStream(queryString,
    conditionalValues
  );
  const stream = db.query(query);
  stream.on("end", () => {
    db.end();
  });
  stream.pipe(JSONStream.stringify()).on("data", (chunk) => {
    const jsonStart = chunk.indexOf("{");
    if (jsonStart > -1) {
      const rowRecord = JSON.parse(chunk.slice(jsonStart));
      actionOnRow(rowRecord);
    }
  });
};

module.exports = { readRecords };
