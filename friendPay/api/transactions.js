const express = require("express");
const { UserAccount, Transaction } = require("../db/models");
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

  const transaction = await Transaction.create({
    date: Date.now(),
    amount,
    status: "pending",
    sendingAccountFk: senderPk,
    receivingAccountFk: receiverPk,
  });

  res.json(transaction);
});

module.exports = merchantAccountRouter;
