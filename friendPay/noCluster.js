
  const express = require("express");
  const server = express();

  server.use(express.json());
  server.use(require("morgan")("dev"));

  server.use("/api", require("./api"));

  server.use("*", (req, res, next) => {
    res.status(404);
    res.send({ error: "route not found" });
  });

  server.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send(err.message);
  });

  server.listen(3000, () => {
    console.log(`Process ${process.pid} is listening on Port 3000`);
  });
