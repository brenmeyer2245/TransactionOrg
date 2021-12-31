var amqp = require('amqplib/callback_api');

const MESSAGING_CONSTANTS = {
  merchantQueue: "merchant_queue",
  merchantAccountQueue: "merchant_account_queue",
};

const sendMessage = (queue, message) => {
  amqp.connect("amqp://localhost", (connectionErr, connection) => {
    console.log("Connected")
    if (connectionErr) throw connectionErr;
    connection.createChannel((channelErr, channel) => {
      if (channelErr) throw channelErr;
      channel.assertQueue(queue, {
        durable: false,
      });

      channel.sendToQueue(queue, Buffer.from(message), {
        persistent: false,
      });
      console.log("Sent message");
    });
  });
};

/**
 * Message takes in object message, standardizes it's keys and returns a json string
 */
const formatMessage = (action, entity, payload) => {
  const result = JSON.stringify({action, entity, payload});
  return result;
};

module.exports = { formatMessage, sendMessage, MESSAGING_CONSTANTS };
