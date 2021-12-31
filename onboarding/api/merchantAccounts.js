const express = require('express');
const { MerchantAccount } = require('../db');
const merchantAccount = require('../db/models/merchantAccount');
const merchantAccountRouter = express.Router();

merchantAccountRouter.get('/:merchantAccountId', async (req, res,next) => {
    const merchantAccount = await MerchantAccount.findOne({
        publicId: req.params.merchantAccountId
    })
    res.json(merchantAccount)
})

module.exports = merchantAccountRouter;