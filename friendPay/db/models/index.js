const User = require("./User");
const UserAccount = require("./UserAccount");
const Transaction = require("./Transaction");

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


module.exports = {
  User,
  UserAccount,
  Transaction,
};
