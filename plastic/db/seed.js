const db = require("./db");
const {
  Buyer,
  Seller,
  Card,
  CardBrand,
  CardType,
  Transaction,
} = require("./models");

async function seed() {
  await db.sync({ force: true });
  console.log("Synced DB");
  await createSellers();
  const buyer = await createBuyers();
  const cardBrand= await createCardBrands();
  const cardType = await createCardTypes();
  await createCards(cardBrand, cardType, buyer );
  await db.close();
}

async function createSellers() {
  const seller = await Seller.create({
    businessName: "Store One",
    active: true
  });
  return seller;
}
async function createBuyers() {
    const buyer = await Buyer.create({
        name: "Store One",
        active: true
      });
      return buyer;
}
async function createCardBrands() {
    const cardBrand = await CardBrand.create({
        name: "Plastic Card",
      });
      return cardBrand;
}
async function createCardTypes() {
    const cardType = await CardType.create({
        name: "debit",
      });
      return cardType;
}

async function createCards(cardBrand, cardType, buyer) {
  const card = await Card.create({
    cardNumber: "111111",
    active: true,
    expirationDate: new Date("2090/01/01"),
    cardBrandPk: cardBrand.pk,
    cardTypePk: cardType.pk,
    buyerPk : buyer.pk
  });
}

seed();
