const User = require("./User");
const UserAccount = require("./UserAccount");
const Transaction = require("./Transaction");
const Status =  require('./Status');

UserAccount.belongsTo(User);
Transaction.belongsTo(UserAccount, {
    foreignKey: {
        name: "receivingAccountFk"
    }
})
Transaction.belongsTo(UserAccount, {
    foreignKey: {
        name: "sendingAccountFk"
    }
})

Transaction.belongsTo(Status, {
    foreignKey: {
        name: "statusFk"
    }
});

module.exports = {
  User,
  UserAccount,
  Transaction,
  Status
};
