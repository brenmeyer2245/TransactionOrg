const express = require('express');
const merchantRouter = express.Router();
const {Merchant} = require('../db')

merchantRouter.get('/:merchantPublicId', async (req, res, next) => {
    res.json(await Merchant.findOne({
        publicId: req.params.merchantPublicId
    }));
});

merchantRouter.post('/', async (req, res, next) => {
    const { name } = req.body;
    
    res.json(await Merchant.create({
       name
    }));
});
module.exports = merchantRouter;