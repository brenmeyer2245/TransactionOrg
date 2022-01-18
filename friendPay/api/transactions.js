const express = require("express");
const { UserAccount, Transaction, Status } = require("../db/models");
const transactionsRouter = express.Router();

transactionsRouter.post("/", async (req, res, next) => {
  const { amount, senderAccountPublicId, receiverAccountPublicId } = req.body;

  const { senderPk: pk } = await UserAccount.findOne({
    where: {
      publicId: senderAccountPublicId,
    },
  });
  const { receiverPk: pk } = await UserAccount.findOne({
    where: {
      publicId: receiverAccountPublicId,
    },
  });

  const {statusPk: pk } = await Status.findOne({
    where: {
      name: "Pending",
    },
  });

  const transaction = await Transaction.create({
    date: Date.now(),
    amount,
    sendingAccountFk: senderPk,
    receivingAccountFk: receiverPk,
    statusFk: statusPk
  });

  res.json(transaction);
});

module.exports = merchantAccountRouter;
