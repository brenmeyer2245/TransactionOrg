const {expect, assert} = require('chai');
const { UUID } = require('sequelize/dist');
const {formatMessage} = require('../services/messaging')


describe('messaging service', () => {
    describe('format message', () => {
        const testObject = {
            action: "POST Merchant", 
            data: {
                name: "Test", 
                publicId: "abc123"
            }
        }
        const result = formatMessage(testObject);
        it('returns a string', () => {
            assert.typeOf(result, "string")
        })
    })
})