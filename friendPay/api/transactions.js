const express = require("express");
const { transaction } = require("../db/db");
const { UserAccount, Transaction, Status } = require("../db/models");
const transactionsRouter = express.Router();


transactionsRouter.post("/", async (req, res, next) => {
  try {
    const { amount, senderAccountPublicId, receiverAccountPublicId } = req.body;

    const sender = await UserAccount.findOne({
      where: {
        publicId: senderAccountPublicId,
      },
    });
    const receiver = await UserAccount.findOne({
      where: {
        publicId: receiverAccountPublicId,
      },
    });

    const status = await Status.findOne({
      where: {
        value: "Pending",
      },
    });

    const transaction = await Transaction.create({
      date: Date.now(),
      amount,
      sendingAccountFk: sender.pk,
      receivingAccountFk: receiver.pk,
      statusFk: status.pk,
    });
    res.json(transaction);
  } catch (e) {
    next(e);
  }
});

transactionsRouter.get("/:publicId", async (req, res, next) => {
  try {
    console.log("Transaction Hit on" + process.pid)
    const { publicId } = req.params;
    const transaction = await Transaction.findOne({ where: { publicId } });
    res.json(transaction);
  } catch (e) {
    next(e);
  }
});

module.exports = transactionsRouter;
