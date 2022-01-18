const db = require("./db");
const { User, UserAccount, Transaction, Status } = require("./models");

async function seed() {
  await db.sync({ force: true });
  console.log("Synced DB");
  const users = await createUsers();
  const userAccounts = await createUserAccounts(users);
  const statuses = await createStatuses();
  const transactions = await createTransactions(userAccounts, statuses);
  await db.close();
}

async function createUsers() {
  return Promise.all([
    User.create({
      username: "userOne",
      userDisplayName: "User One",
      password: "Encrypted",
      active: true,
    }),
    User.create({
      username: "userTwo",
      userDisplayName: "User Two",
      password: "Encrypted",
      active: true,
    }),
  ]);
}
async function createUserAccounts(users) {
  return Promise.all([
    UserAccount.create({
      accountName: users[0].username + " Account",
      active: true,
    }),
    UserAccount.create({
      accountName: users[1].username + " Account",
      active: true,
    }),
  ]);
}
async function createStatuses() {
  return Promise.all([
    Status.create({
      value: "Complete",
    }),
    Status.create({
      value: "Pending",
    }),
  ]);
}

async function createTransactions(userAccounts, statuses) {
  try {
  const trxn1 = await Transaction.create({
    amount: 10.0,
    date: Date.now(),
    status: "complete",
    receivingAccountFk: userAccounts[0].pk,
    sendingAccountFk: userAccounts[1].pk,
    statusFk: statuses[0].pk
  });
  const trxn2 = await Transaction.create({
    amount: 11.0,
    date: Date.now(),
    status: "complete",
    receivingAccountFk: userAccounts[1].pk,
    sendingAccountFk: userAccounts[0].pk,
    statusFk: statuses[1].pk
  });
  return [trxn1, trxn2];
 } catch(e) {
   console.log(e);
 }
}

seed();
