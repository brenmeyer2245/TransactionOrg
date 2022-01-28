const express = require('express');
const server = express();
server.use(express.json());
const {initMessagingQueues, connectMessagingService} = require('./services/messaging')

server.use('/api', require('./api'));

connectMessagingService()

server.listen(3000, () => {
    console.log("Listening on Port 3000")
})

module.exports = server;