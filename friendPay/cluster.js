const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  //Master process
  const n_cpus = os.cpus().length;
  console.log(os.cpus);
  console.log(`Forking ${n_cpus} CPUs`)
  for (let i = 0; i < n_cpus; i++){
    cluster.fork();
  }
} else {
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
}
