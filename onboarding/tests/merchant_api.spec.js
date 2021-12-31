const {db, Merchant} = require('../db');
const server = require('../index.js');
const request = require('supertest')
const {expect, assert} = require('chai');

xdescribe('merchant api endpoints', () => {
    let merchant
    beforeEach(async () => {
        await db.sync({force: true})
        merchant = await  Merchant.create({
            name: "merchantOnFile"
          });
      })
    describe('POST /api/merchant', () => {
        it('creates a new merchant', async () => {
            return await request(server)
                .post('/api/merchants')
                .send({name: "My New Merchant"})
                .expect(res => {
                    expect(res.body.name).equals("My New Merchant")
                    assert.typeOf(res.body.publicId, "string")
                })
        })
    })
    describe('GET /api/merchants/:merchantPublicId', () => {
        it('fetches a merchant by public Id', async () => {
            return await request(server)
                .get(`/api/merchants/${merchant.publicId}`)
                .expect(res => {
                    expect(res.body.name).equals("merchantOnFile")
                    assert.typeOf(res.body.publicId, "string")
                })
        })
    })
})