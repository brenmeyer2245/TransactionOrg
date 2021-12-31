const {db, Merchant, MerchantAccount} = require('../db');
const server = require('../index.js');
const request = require('supertest')
const {expect, assert} = require('chai');
const merchantAccount = require('../db/models/merchantAccount');

xdescribe('merchant account api endpoints', () => {
    let merchant
    beforeEach(async () => {
        await db.sync({force: true})
        merchant = await  Merchant.create({
            name: "merchantOnFile"
          });
        merchantAccountOne = await  MerchantAccount.create({
            name: "merchant account one",
            MerchantPk: merchant.pk
          });
      })
    describe('GET /api/merchant_accounts/:publicId', () => {
        it('gets merchant account by public id', async () => {
            return await request(server)
                .get(`/api/merchant_accounts/${merchantAccount.publicId}`)
                .expect(res => {
                    expect(res.body.name).equals("merchant account one")
                    assert.typeOf(res.body.publicId, "string")
                })
        })
    })
   
})