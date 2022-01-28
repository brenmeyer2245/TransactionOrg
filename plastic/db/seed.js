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
  const seller = await createSellers();
  const buyer = await createBuyers();
  const cardBrand= await createCardBrands();
  const cardType = await createCardTypes();
  const card = await createCards(cardBrand, cardType, buyer );
  await createTransactions(seller, buyer, card)
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
  return await Card.create({
    cardNumber: "111111",
    active: true,
    expirationDate: new Date("2090/01/01"),
    cardBrandPk: cardBrand.pk,
    cardTypePk: cardType.pk,
    buyerPk : buyer.pk
  });

}
async function createTransactions(seller, buyer, card) {
  const dateNow = new Date();
  const nextDate = new Date(); 
  nextDate.setDate(dateNow.getDate() + 1);

  const trxn1 = await Transaction.create({
    sellerFk: seller.pk,
    cardFk: card.pk,
    buyerFk : buyer.pk,
    settlementAmount: 10.00, 
    settlementDateTime: dateNow,
    transactionType: "sale",
  });
  const trxn2 = await Transaction.create({
    sellerFk: seller.pk,
    cardFk: card.pk,
    buyerFk : buyer.pk,
    settlementAmount: 11.00, 
    settlementDateTime: dateNow,
    transactionType: "sale",
  });
  const trxn3 = await Transaction.create({
    sellerFk: seller.pk,
    cardFk: card.pk,
    buyerFk : buyer.pk,
    settlementAmount: 12.00, 
    settlementDateTime: nextDate,
    transactionType: "sale",
  });
  const trxn4 = await Transaction.create({
    sellerFk: seller.pk,
    cardFk: card.pk,
    buyerFk : buyer.pk,
    settlementAmount: 13.00, 
    settlementDateTime: nextDate,
    transactionType: "sale",
  });
}

seed();
