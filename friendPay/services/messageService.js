var amqp = require("amqplib/callback_api");
const { User, UserAccount } = require("../db");

const MESSAGING_CONSTANTS = {
  CONN_URL: "amqp://localhost",
  MERCHANT_QUEUE: "friendPayMerchantQueue",
  MERCHANT_ACCOUNT_QUEUE: "friendPayMerchantAccountQueue",
  ENTITY_MAPPINGS: {
    MERCHANT: {
      entity: User,
      POST: ({ name }) => {
        User.create({ username: name, password: "guest", userDisplayName: name, active: true });
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
  try {
    JSON.parse(message); 
  } catch(e){
    return false
  }

  //convert to an object
  const { entity, action, payload } = JSON.parse(message);
  const mappedEntity = MESSAGING_CONSTANTS.ENTITY_MAPPINGS[entity];

  console.log(message);
  if (!payload || !mappedEntity) return;

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
