const express = require('express');
const server = express();
server.use(express.json());

server.use('/api', require('./api'));

server.listen(3000, () => {
    console.log("Listening on Port 3000")
})

module.exports = server;