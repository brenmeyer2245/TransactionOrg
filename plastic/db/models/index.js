const Buyer = require('./Buyer');
const Seller = require('./Seller');
const Card = require('./Card');
const CardBrand = require('./CardBrand');
const CardType = require('./CardType');
const Transaction = require('./Transaction');

Transaction.hasOne(Buyer);
Transaction.hasOne(Seller);
Transaction.hasOne(Card);

Card.hasOne(CardBrand)
Card.hasOne(CardType)
Card.hasOne(Buyer)

module.exports = {
    Buyer,
    Seller,
    Card, 
    CardBrand, 
    CardType, 
    Transaction
}