const Buyer = require("./Buyer");
const Seller = require("./Seller");
const Card = require("./Card");
const CardBrand = require("./CardBrand");
const CardType = require("./CardType");
const Transaction = require("./Transaction");

Transaction.belongsTo(Buyer, {
  foreignKey: {
    name: "buyerFk",
  },
});
Transaction.belongsTo(Seller, {
  foreignKey: {
    name: "sellerFk",
  },
});
Transaction.belongsTo(Card, {
  foreignKey: {
    name: "cardFk",
  },
});

Card.hasOne(CardBrand);
Card.hasOne(CardType);
Card.belongsTo(Buyer);

module.exports = {
  Buyer,
  Seller,
  Card,
  CardBrand,
  CardType,
  Transaction,
};
