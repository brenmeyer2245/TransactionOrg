const express = require("express");
const merchantRouter = express.Router();
const { Merchant } = require("../db");
const {
  formatMessage,
  sendMessage,
  MESSAGING_CONSTANTS,
} = require("../services/messaging");

merchantRouter.get("/:merchantPublicId", async (req, res, next) => {
  res.json(
    await Merchant.findOne({
      publicId: req.params.merchantPublicId,
    })
  );
});

merchantRouter.post("/", async (req, res, next) => {
  const { name } = req.body;
  const merchant = await Merchant.create({
    name,
  });
  sendMessage(
    MESSAGING_CONSTANTS.merchantQueue,
    formatMessage("POST", "MERCHANT", merchant)
  );
  res.json(merchant);
});
module.exports = merchantRouter;
