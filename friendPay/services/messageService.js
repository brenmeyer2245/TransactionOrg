var amqp = require("amqplib/callback_api");
const { User, UserAccount } = require("../db");

const MESSAGING_CONSTANTS = {
  CONN_URL: "amqp://localhost",
  MERCHANT_QUEUE: "merchant_queue",
  MERCHANT_ACCOUNT_QUEUE: "merchant_account_queue",
  ENTITY_MAPPINGS: {
    MERCHANT: {
      entity: User,
      POST: ({ username, password, userDisplayName }) => {
        User.create({ username, password, userDisplayName, active: true });
      },
    },
    MERCHANT_ACCOUNT: {
      entity: UserAccount,
      POST: ({ username, password, userDisplayName }) => {
        UserAccount.create({
          username,
          password,
          userDisplayName,
          active: true,
        });
      },
    },
  },
};

const consumeMessage = (message) => {
  console.log(".....");
  console.log("Message:", message.content.toString());
  processMessage(message.content);
};

const setupListener = (conn_url, queue) => {
  amqp.connect(conn_url, function (err, conn) {
    conn.createChannel(function (err, ch) {
      console.log("now Listening for rabbits");
      ch.consume(queue, consumeMessage, { noAck: true });
    });
  });
};

async function processMessage(message) {
  //convert to an object
  const { entity, action, payload } = JSON.parse(message);
  const mappedEntity = MESSAGING_CONSTANTS.ENTITY_MAPPINGS[entity];
  switch (action) {
    case "POST": {
      mappedEntity.POST(payload)
      break;
    }
    case "PUT": {
      mappedEntity.entity.findById(payload.entityId);

      break;
    }
    case "DELETE": {
      mappedEntity.entity
        .findById(payload.entityId)
        .then((entity) => entity.destroy());
      break;
    }
    default: {
      throw "Invalid Action Received";
    }
  }

  console.log(payload);
}

setupListener(MESSAGING_CONSTANTS.CONN_URL, MESSAGING_CONSTANTS.MERCHANT_QUEUE);
