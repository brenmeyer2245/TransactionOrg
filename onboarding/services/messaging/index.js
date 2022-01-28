var amqp = require("amqplib/callback_api");

const MESSAGING_CONSTANTS = {
  friendPayMerchantQueue: "friendPayMerchantQueue",
  friendPaymerchantAccountQueue: "friendPaymerchantAccountQueue",
  plasticMerchantQueue: "plasticMerchantQueue",
  plasticMerchantAccountQueue: "plasticMerchantAccountQueue",
};

let messagingChannel = null;

function connectMessagingService() {
  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      messagingChannel = channel;
      initMessagingQueues();
    });
  });
}

const sendMessage = (queue, message) => {
  messagingChannel.assertQueue(queue, {
    durable: false,
  });

  messagingChannel.sendToQueue(queue, Buffer.from(message), {
    persistent: false,
  });
  console.log("Sent message");
};

/**
 * Message takes in object message, standardizes it's keys and returns a json string
 */
const formatMessage = (action, entity, payload) => {
  const result = JSON.stringify({ action, entity, payload });
  return result;
};

const initMessagingQueues = () => {
  Object.keys(MESSAGING_CONSTANTS).forEach((queue) =>
    sendMessage(queue, "INITIALIZE")
  );
};

module.exports = {
  formatMessage,
  sendMessage,
  initMessagingQueues,
  connectMessagingService,
  MESSAGING_CONSTANTS,
};
