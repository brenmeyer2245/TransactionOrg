const express = require("express");
const { Seller, Buyer, Transaction } = require("../db/models");
const transactionsRouter = express.Router();

transactionsRouter.post("/", async (req, res, next) => {
  const { amount, transactionType, cardPublicId, sellerPublicId, buyerPublicId, cardPublicId } = req.body;

  const seller = await Seller.findOne({
    where: {
      publicId: sellerPublicId,
    },
  });
  const buyer = await Buyer.findOne({
    where: {
      publicId: buyerPublicId,
    },
  });
  const card = await Card.findOne({
    where: {
      publicId: cardPublicId,
    },
  });

  const transaction = await Transaction.create({
    settlementDateTime: Date.now(),
    settlementAmount: amount,
    transactionType,
    sellerFk: seller.pk,
    cardFk: card.pk,
    buyerFk : buyer.pk,
  });
  res.json(merchantAccount);
});

module.exports = merchantAccountRouter;
